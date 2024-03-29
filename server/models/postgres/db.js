const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DB_URL, {
  useNewUrlParser: true,
  logging: false
});

connection.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = connection;
