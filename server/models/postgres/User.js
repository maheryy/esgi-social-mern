const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcryptjs = require("bcryptjs");
const { SMALLINT } = require("sequelize");

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
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: "0",
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        min: 2,
      },
    },
  },
  techList :{
    type: DataTypes.STRING,
    allowNull: false,     
  },
  studyList :{
    type: DataTypes.STRING,
    allowNull: false, 
  }, 
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  pictureId:{
    type : DataTypes.STRING,
    allowNull: true,
    defaultValue : "0",
  }
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
