const { checkToken } = require("../lib/jwt");
const { User } = require("../models/postgres");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  console.log(token)
  const user = await checkToken(token);
  if (user) {
    req.user = await User.findByPk(user.id);
    next();
  } else {
    res.sendStatus(401);
  }
};