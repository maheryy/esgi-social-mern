const { Router } = require("express");
const { User } = require("../models/postgres");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../lib/jwt");
const router = new Router();

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

module.exports = router;