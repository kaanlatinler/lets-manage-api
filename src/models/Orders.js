module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "OrderDate is required" },
        notEmpty: { msg: "OrderDate is required" },
      },
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: "OrderTime is required" },
        notEmpty: { msg: "OrderTime is required" },
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Quantity is required" },
        notEmpty: { msg: "Quantity is required" },
      },
    },
    TotalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: "TotalAmount is required" },
        notEmpty: { msg: "TotalAmount is required" },
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
    TableId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "TableId is required" },
        notEmpty: { msg: "TableId is required" },
      },
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "ProductId is required" },
        notEmpty: { msg: "ProductId is required" },
      },
    },
    StatusId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "StatusId is required" },
        notEmpty: { msg: "StatusId is required" },
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
  return Orders;
};
