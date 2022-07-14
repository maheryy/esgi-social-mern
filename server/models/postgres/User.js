const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcryptjs = require("bcryptjs");

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 6,
        max: 255,
      },
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 2,
      },
    },
  },
});

User.addHook("beforeCreate", async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

module.exports = User;
