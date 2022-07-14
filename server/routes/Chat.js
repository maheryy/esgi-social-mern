const { Router } = require("express");
const {
  User,
  Conversation,
  Message,
  UserConversation,
} = require("../models/postgres");
const router = new Router();
const { Op } = require("sequelize");

// Todo Authentication
userId = 1;

router.post("/test", async (req, res) => {
  res.send("testing some stuff...");
});

router.get("/", async (req, res) => {
  try {
    let data = await Conversation.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: UserConversation,
          as: "userTargets",
          required: true,
          where: {
            userId: userId,
            isDeleted: false,
          },
          include: User,
        },
        {
          model: UserConversation,
          as: "userParticipants",
          where: {
            userId: {
              [Op.not]: userId,
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

    result = data.map((item) => ({
      id: item.id,
      lastMessage: item.messages[0],
      users: item.userParticipants.map((el) => el.user),
      // users: [
      //   item.userTargets[0].user,
      //   ...item.userParticipants.map((el) => el.user),
      // ],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.sendStatus(400);
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.sendStatus(404);
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
            userId: userId,
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
      return res.status(userConversation.isDeleted ? 201 : 200).json({
        id: userConversation.conversationId,
        user: userConversation.user,
      });
    }

    // Create new conversation
    const newConversation = await Conversation.create();
    conversationId = newConversation.id;

    const users = [userId, receiverId];
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
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let result = await Message.findAll({
      where: {
        conversationId: req.params.id,
      },
      order: [["createdAt", "ASC"]],
      include: User,
    });

    if (!result) {
      return res.sendStatus(404);
    }

    // Update messages not read yet  by current user
    await Message.update(
      { readAt: new Date() },
      {
        where: {
          conversationId: req.params.id,
          userId: {
            [Op.not]: userId,
          },
          readAt: null,
        },
      }
    );

    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [affectedRows] = await UserConversation.update(
      {
        isDeleted: true,
      },
      {
        where: {
          userId: userId,
          conversationId: parseInt(req.params.id, 10),
        },
      }
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.json({
        success: true,
      });
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/message", async (req, res) => {
  try {
    let { conversationId } = req.body;

    const result = await Message.create({
      content: req.body.content,
      conversationId: conversationId,
      userId: userId,
    });

    res.status(201).json(result);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.put("/message/:id", async (req, res) => {
  try {
    if (!req.body?.content?.length) {
      return res.sendStatus(400);
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
    } else {
      res.json(result);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.delete("/message/:id", async (req, res) => {
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
    } else {
      res.json(result);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
