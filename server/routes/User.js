const { Router } = require("express");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const checkAuth = require("../middleware/checkAuth");
const { Op } = require("sequelize");


const router = new Router();

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(
      {
        attributes: ["id", "firstname", "email", "pseudo", "status", "techList", "studyList"],
        order: [["status", "DESC"]],
        where: {
          status: {
            [Op.ne]: -1,
          }
        }
      }
    );
    res.json(users);
    next();
  }
  catch (error) {
    res.sendStatus(500);
    console.error(error);
    next();
  }
}
);

router.post("/",async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    req.body.password = result.dataValues.password;
    res.status(201).json(result);
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
      next();
    } else {
      res.sendStatus(500);
      next();
      console.error(error);
    }
  }
});

router.get("/:id" ,async (req, res, next) => {
  try {
    const result = await User.findByPk(parseInt(req.params.id, 10));
    if (!result) {
      res.sendStatus(404);
      next();
    } else {
      res.json(result);
      next();
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    next();
  }
});

router.put("/:id" ,async (req, res, next) => {
  try {
    const [nbLines, [result]] = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id, 10),
      },
      returning: true,
      individualHooks: true,
    });
    req.body.password = result.dataValues.password
    console.log(result);
    if (!nbLines) {
      res.sendStatus(404);
      next();
    } else {
      res.json(result);
      next();
    }
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
      next();
    } else {
      res.sendStatus(500);
      next();
      console.error(error);
    }
  }
});

router.delete("/:id" ,async (req, res, next) => {
  try {
    const nbLines = await User.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (!nbLines) {
      res.sendStatus(404);
      next();
    } else {
      res.sendStatus(204);
      next();
    }
  } catch (error) {
    res.sendStatus(500);
    next();
    console.error(error);
  }
});

module.exports = router;
