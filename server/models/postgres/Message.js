const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Conversation = require("./Conversation");

const Message = sequelize.define(
  "message",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isModerated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    readAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    modifiedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
  },
  {
    hooks: {
      afterCreate: async (message) => {
        await Conversation.update(
          { updatedAt: new Date() },
          {
            where: {
              id: message.conversationId,
            },
            silent: true,
          }
        );
      },
    },
  }
);
module.exports = Message;
