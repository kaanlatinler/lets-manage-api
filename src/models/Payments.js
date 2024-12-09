module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define("Payments", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Date is required" },
        notEmpty: { msg: "Date is required" },
      },
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: "Time is required" },
        notEmpty: { msg: "Time is required" },
      },
    },
    Method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Method is required" },
        notEmpty: { msg: "Method is required" },
      },
    },
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "OrderId is required" },
        notEmpty: { msg: "OrderId is required" },
      },
    },
    EmployeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "EmployeeId is required" },
        notEmpty: { msg: "EmployeeId is required" },
      },
    },
    BusinessId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "BusinessId is required" },
        notEmpty: { msg: "BusinessId is required" },
      },
    },
  });
  return Payments;
};
