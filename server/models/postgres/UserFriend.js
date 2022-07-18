const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const UserFriend = sequelize.define("user_friend", {
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = UserFriend;
