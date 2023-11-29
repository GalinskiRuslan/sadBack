const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Days",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dayName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "Days",
    }
  );
};
