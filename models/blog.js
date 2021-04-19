module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Blog",
    {
      title: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.STRING(180),
      },
      photo: {
        type: DataTypes.TEXT,
        defaultValue: "no-blog-picture.jpg",
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      tableName: "blog",
    }
  );
};
