const shortid = require("shortid");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      firstname: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING(180),
        defaultValue: "no-profile-picture.jpg",
      },

      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      id: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        defaultValue: shortid.generate,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      tableName: "user",
    }
  );
};
