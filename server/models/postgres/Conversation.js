const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Conversation = sequelize.define(
  "conversation",
  {
    isGroup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    /* updatedAt column has to be uptaded manually after new messages are created within a conversation */
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = Conversation;
