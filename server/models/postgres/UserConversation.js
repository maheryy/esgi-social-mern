const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const UserConversation = sequelize.define("user_conversation", {
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = UserConversation;
