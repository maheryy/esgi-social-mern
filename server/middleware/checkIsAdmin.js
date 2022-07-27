module.exports = (req, res, next) => {
  if (!req?.user?.isAdmin) {
    res.sendStatus(403);
  }
  next();
};