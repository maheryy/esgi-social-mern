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
    let result = await UserConversation.findAll({
      where: {
        userId: userId,
        isDeleted: false,
      },
      include: {
        model: Conversation,
        required: true,
        include: {
          required: true,
          model: UserConversation,
          where: {
            userId: {
              [Op.not]: userId,
            },
          },
          include: User,
        },
      },
    });

    result = result.map((item) => ({
      id: item.conversationId,
      users: item.conversation.user_conversations.map((user) => user.user),
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
    let result = await UserConversation.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: Conversation,
        required: true,
        include: {
          required: true,
          model: UserConversation,
          where: {
            isGroup: false,
            userId: receiverId,
          },
          include: User,
        },
      },
    });

    if (result) {
      if (result.isDeleted) {
        await UserConversation.update(
          {
            isDeleted: false,
          },
          {
            where: {
              id: result.id,
            },
          }
        );
      }
      return res.status(result.isDeleted ? 201 : 200).json({
        id: result.conversationId,
        user: result.conversation.user_conversations[0].user,
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
    let result = await Conversation.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Message,
        include: User,
        order: [["createdAt", "ASC"]],
      },
    });

    if (!result) {
      return res.sendStatus(404);
    }

    res.status(200).json(result.messages);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [nbLines] = await UserConversation.update(
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

    if (!nbLines) {
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
    let { conversationId, receiverId } = req.body;

    if (!conversationId) {
      if (!receiverId) {
        return res.sendStatus(400);
      }

      const newConversation = await Conversation.create();
      conversationId = newConversation.id;

      const users = !Array.isArray(receiverId)
        ? [receiverId, userId]
        : [...receiverId, userId];

      console.log(users);

      for (let i = 0; i < users.length; i++) {
        await UserConversation.create({
          conversationId: conversationId,
          userId: users[i],
        });
      }
    }

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
    if (!req.body.content.length) {
      return res.sendStatus(400);
    }

    const [nbLines, [result]] = await Message.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (!nbLines) {
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
    const [nbLines] = await Message.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!nbLines) {
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

module.exports = router;
