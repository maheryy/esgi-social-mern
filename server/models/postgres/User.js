const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcryptjs = require("bcryptjs");

const User = sequelize.define("user", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 2,
      },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 2,
      },
    },
  },
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
  status: {
    type: DataTypes.STRING,
    enum: ["active", "deleted", "banned"],
    defaultValue: "active",
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
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
