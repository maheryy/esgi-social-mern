const { Router } = require("express");
const { User } = require("../models/postgres");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../lib/jwt");
const {ValidationError} = require("sequelize");
const router = new Router();

const formatError = (validationError) => {
  return Object.keys(validationError.errors).reduce((acc, key) => {
    acc[key] = validationError.errors[key].message;
    return acc;
  }, {});
};

router.post("/login", async (req, res, next) => {
  try {
    const result = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!result) {
      res.status(401).json({
        email: "Identifiant incorrect",
      });
      return next();
    }
    if (!(await bcryptjs.compare(req.body.password, result.password))) {
      res.status(401).json({
        password: "Mot de passe incorrect",
      });
      return next();
    }
    res.json({ token: await createToken(result), user: result });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    return next();
  }
});

router.post("/register",async (req, res, next) => {
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

module.exports = router;