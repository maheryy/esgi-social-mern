const { Router } = require("express");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../lib/jwt");
const checkIsAdmin = require("../middleware/checkIsAdmin");
const checkAuth = require("../middleware/checkAuth");
const router = new Router();

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

// router.post("/register", async (req, res) => {
//   try {
//     const result = await User.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       res.status(422).json(formatError(error));
//     } else {
//       res.sendStatus(500);
//       console.error(error);
//     }
//   }
// });x

router.post("/login", async (req, res) => {
  try {
    console.log(2);
    const result = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!result) {
      res.status(401).json({
        email: "Email inexistant",
      });
      return;
    }
    if (!(await bcryptjs.compare(req.body.password, result.password))) {
      res.status(401).json({
        password: "Mot de passe incorrect",
      });
      return;
    }
    res.json({ token: await createToken(result), user: result });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;