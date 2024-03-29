const { Router } = require("express");
const {
  User,
  Conversation,
  Message,
  UserConversation,
} = require("../models/postgres");
const router = new Router();
const { Op } = require("sequelize");
const { STATUS_CANCELLED } = require("../lib/constants");

router.get("/", async (req, res, next) => {
  try {
    let result = await Conversation.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: UserConversation,
          as: "userTargets",
          required: true,
          where: {
            userId: req.user.id,
            isDeleted: false,
          },
          include: User,
        },
        {
          model: UserConversation,
          as: "userParticipants",
          where: {
            userId: {
              [Op.not]: req.user.id,
            },
          },
          include: User,
        },
        {
          model: Message,
          required: true,
          limit: 1,
        },
      ],
    });

    result = result.map((item) => ({
      id: item.id,
      lastMessage: item.messages[0],
      users: item.userParticipants.map((el) => el.user),
      // users: [
      //   item.userTargets[0].user,
      //   ...item.userParticipants.map((el) => el.user),
      // ],
    }));

    res.status(200).json(result);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      res.sendStatus(400);
      return next();
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      res.sendStatus(404);
      return next();
    }

    // Check if a conversation doesn't exxist yet
    let result = await Conversation.findOne({
      where: {
        isGroup: false,
      },
      include: [
        {
          model: UserConversation,
          as: "userTargets",
          required: true,
          where: {
            userId: req.user.id,
          },
          include: User,
        },
        {
          model: UserConversation,
          as: "userParticipants",
          required: true,
          where: {
            userId: receiverId,
          },
          include: User,
        },
      ],
    });

    if (result) {
      const userConversation = result.userTargets[0];

      if (userConversation.isDeleted) {
        await UserConversation.update(
          {
            isDeleted: false,
          },
          {
            where: {
              id: userConversation.id,
            },
          }
        );
      }

      res.status(userConversation.isDeleted ? 201 : 200).json({
        id: userConversation.conversationId,
        user: result.userParticipants[0].user,
      });
      return next();
    }

    // Create new conversation
    const newConversation = await Conversation.create();
    const conversationId = newConversation.id;

    const users = [req.user.id, receiverId];
    for (let i = 0; i < users.length; i++) {
      await UserConversation.create({
        conversationId: conversationId,
        userId: users[i],
      });
    }

    res.status(201).json({
      id: conversationId,
      user: receiver,
    });
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Conversation.findOne({
      where: {
        id: req.params.id
      },
      order: [
        [Message, "createdAt", "ASC"]
      ],
      include: [
        {
          model: Message,
        },
        {
          model: UserConversation,
          as: "userParticipants",
          where: {
            userId: {
              [Op.not]: req.user.id,
            }
          },
          include: User,
        }
      ]
    });

    if (!result) {
      res.sendStatus(404);
      return next();
    }

    // Update messages not read yet  by current user
    if (result.messages.length) {
      await Message.update(
        { readAt: new Date() },
        {
          where: {
            conversationId: req.params.id,
            userId: {
              [Op.not]: req.user.id,
            },
            readAt: null,
          },
        }
      );
    }

    res.status(200).json(result);
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [affectedRows] = await UserConversation.update(
      {
        isDeleted: true,
      },
      {
        where: {
          userId: req.user.id,
          conversationId: parseInt(req.params.id, 10),
        },
      }
    );

    if (!affectedRows) {
      res.sendStatus(404);
      next();
    } else {
      res.json({
        success: true,
      });
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.post("/message", async (req, res, next) => {
  try {
    let { conversationId } = req.body;

    const result = await Message.create({
      content: req.body.content,
      conversationId: conversationId,
      userId: req.user.id,
    });

    res.status(201).json(result);
    res.sendEvent("new-message", {
      from: req.user.id,
      conversation: conversationId,
    });
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.put("/message/:id", async (req, res, next) => {
  try {
    if (!req.body?.content?.length) {
      res.sendStatus(400);
      return next();
    }

    const [affectedRows, [result]] = await Message.update(
      {
        content: req.body.content,
        modifiedAt: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (!affectedRows) {
      res.sendStatus(404);
      next();
    } else {
      res.json(result);
      res.sendEvent("edit-message", {
        from: req.user.id,
        conversation: result.conversationId,
      });
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.delete("/message/:id", async (req, res, next) => {
  try {
    const [affectedRows, [result]] = await Message.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (!affectedRows) {
      res.sendStatus(404);
      next();
    } else {
      res.json(result);
      res.sendEvent("delete-message", {
        from: req.user.id,
        conversation: result.conversationId,
      });
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

module.exports = router;
