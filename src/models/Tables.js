module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define("Tables", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      },
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Capacity is required" },
        notEmpty: { msg: "Capacity is required" },
      },
    },
    CategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    BusinessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return Tables;
};
