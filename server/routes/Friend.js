const { Router } = require("express");
const {
  User,
  UserFriend,
} = require("../models/postgres");
const {
  STATUS_ACCEPTED,
  STATUS_REJECTED,
  STATUS_HOLD,
  STATUS_DELETED,
  STATUS_CANCELLED
} = require("../lib/constants");
const router = new Router();
const { Op } = require("sequelize");
const checkAuth = require("../middleware/checkAuth");

// Todo Authentication
const userId = 1;

router.get("/",checkAuth , async (req, res) => {
  const { status, as } = req.query;

  let criteria = [
    { requestorId: userId },
    { targetId: userId },
  ];

  if (as === "requestor") {
    criteria = [{ requestorId: userId }];
  } else if (as === "target") {
    criteria = [{ targetId: userId }];
  }

  try {
    let result = await UserFriend.findAll({
      where: {
        status: status ?? STATUS_ACCEPTED,
        [Op.or]: criteria
      },
      include: [
        {
          model: User,
          as: "requestor",
        },
        {
          model: User,
          as: "target",
        },
      ]
    });

    result = result.map((row) => {
      let user = row.requestorId === userId ? row.target : row.requestor;
      return {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        status: user.status,
        relationship: {
          id: row.id,
          status: row.status
        }
      };
    });

    res.status(200).json(result);
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.get("/discover",checkAuth ,async (req, res) => {
  try {
    let criteria = {};

    if (req.query.query) {
      criteria.firstname = {
        [Op.iLike]: `%${req.query.query}%`
      };
    }

    let result = await User.findAll({
      where: {
        id: {
          [Op.not]: userId
        },
        ...criteria
      },
      include: [
        {
          model: UserFriend,
          required: false,
          as: "requestors",
          where: {
            targetId: userId,
            status: {
              [Op.in]: [STATUS_HOLD, STATUS_ACCEPTED]
            }
          }
        },
        {
          model: UserFriend,
          required: false,
          as: "targets",
          where: {
            requestorId: userId,
            status: {
              [Op.in]: [STATUS_HOLD, STATUS_ACCEPTED]
            }
          }
        },
      ]
    });

    result = result.map((row) => ({
      id: row.id,
      email: row.email,
      firstname: row.firstname,
      relationship: row.requestors.length
        ? (row.requestors[0])
        : (row.targets.length ? row.targets[0] : null)
    }));

    res.json(result);
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const { targetId } = req.body;

    if (!targetId) {
      return res.sendStatus(400);
    }

    let friendship = await getFriendship(userId, targetId);

    // A friendship already exist between 2 users
    if (friendship) {
      let isRenewal = [STATUS_DELETED, STATUS_REJECTED, STATUS_CANCELLED].includes(friendship.status);

      if (isRenewal) {
        const [affectedRows, [updated]] = await UserFriend.update(
          {
            status: STATUS_HOLD,
            targetId: targetId,
            requestorId: userId,
          },
          {
            where: {
              id: friendship.id
            },
            returning: true
          }
        );

        friendship = updated;
      }

      res.status(isRenewal ? 201 : 200).json(friendship);
      next();
    }

    const result = await UserFriend.create({
      requestorId: userId,
      targetId: targetId,
      status: STATUS_HOLD
    });

    res.status(201).json(result);
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (![STATUS_ACCEPTED, STATUS_REJECTED, STATUS_CANCELLED].includes(status)) {
      res.sendStatus(400);
      next();
    }

    // Make sure the update is requested by the right user
    const userVerification = status === STATUS_CANCELLED
      ? { requestorId: userId }
      : { targetId: userId };

    const [affectedRows, [result]] = await UserFriend.update(
      { status },
      {
        where: {
          id: parseInt(req.params.id, 10),
          status: STATUS_HOLD,
          ...userVerification
        },
        returning: true
      });

    if (!affectedRows) {
      res.sendStatus(404);
      next();
    } else {
      res.json(result);
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const [affectedRows] = await UserFriend.update(
      {
        status: STATUS_DELETED,
      },
      {
        where: {
          id: parseInt(req.params.id, 10),
          status: STATUS_ACCEPTED
        },
      }
    );

    if (!affectedRows) {
      res.sendStatus(404);
      next();
    } else {
      res.sendStatus(200);
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

const getFriendship = async (a, b) => {
  return await UserFriend.findOne({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { requestorId: b },
            { targetId: a },
          ]
        },
        {
          [Op.and]: [
            { requestorId: a },
            { targetId: b },
          ],
        }
      ]
    }
  });
};

module.exports = router;
