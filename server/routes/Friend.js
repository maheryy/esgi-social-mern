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

router.get("/", async (req, res, next) => {
  const { status, as } = req.query;

  let criteria = [
    { requestorId: req.user.id },
    { targetId: req.user.id },
  ];

  if (as === "requestor") {
    criteria = [{ requestorId: req.user.id }];
  } else if (as === "target") {
    criteria = [{ targetId: req.user.id }];
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
      let user = row.requestorId === req.user.id ? row.target : row.requestor;
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        email: user.email,
        status: user.status,
        pictureId: user.pictureId,
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
    console.error(error);
    next();
  }
});

router.get("/discover", async (req, res, next) => {
  try {
    let criteria = {};
    let { query, techs, studies } = req.query;
    techs = techs.length ? `;(${techs.replaceAll(",", "|")});` : null;
    studies = studies.length ? `(${studies.replaceAll(",", "|")})` : null;

    console.log(techs, studies);
    if (query) {
      criteria.pseudo = { [Op.iLike]: `%${query}%` };
    }

    if (techs && studies) {
      criteria[Op.and] = [
        { techList: { [Op.regexp]: techs } },
        { studyList: { [Op.regexp]: studies } },
      ];
    } else {
      if (techs) {
        criteria.techList = { [Op.regexp]: techs };
      }
      if (studies) {
        criteria.studyList = { [Op.regexp]: studies };
      }
    }

    let result = await User.findAll({
      where: {
        id: {
          [Op.not]: req.user.id
        },
        ...criteria
      },
      include: [
        {
          model: UserFriend,
          required: false,
          as: "requestors",
          where: {
            targetId: req.user.id,
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
            requestorId: req.user.id,
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
      lastname: row.lastname,
      pseudo: row.pseudo,
      study: row.studyList,
      pictureId: row.pictureId,
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

router.post("/", async (req, res, next) => {
  try {
    const { targetId } = req.body;

    if (!targetId) {
      return res.sendStatus(400);
    }

    let friendship = await getFriendship(req.user.id, targetId);

    // A friendship already exist between 2 users
    if (friendship) {
      let isRenewal = [STATUS_DELETED, STATUS_REJECTED, STATUS_CANCELLED].includes(friendship.status);

      if (isRenewal) {
        const [affectedRows, [updated]] = await UserFriend.update(
          {
            status: STATUS_HOLD,
            targetId: targetId,
            requestorId: req.user.id,
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
      res.sendEvent("friend-request", {
        from: req.user.id,
        to: targetId
      });
      return next();
    }

    const result = await UserFriend.create({
      requestorId: req.user.id,
      targetId: targetId,
      status: STATUS_HOLD
    });

    res.status(201).json(result);
    res.sendEvent("friend-request", {
      from: req.user.id,
      to: targetId
    });
    next();
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (![STATUS_ACCEPTED, STATUS_REJECTED, STATUS_CANCELLED].includes(status)) {
      res.sendStatus(400);
      return next();
    }

    // Make sure the update is requested by the right user
    const userVerification = status === STATUS_CANCELLED
      ? { requestorId: req.user.id }
      : { targetId: req.user.id };

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
      res.sendEvent("friend-response", {
        from: req.user.id,
        to: status === STATUS_CANCELLED ? result.targetId : result.requestorId,
        status: status,
      });
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

router.delete("/:id", async (req, res, next) => {
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
