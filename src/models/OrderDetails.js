module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define("OrderDetails", {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Orders", // Orders tablosuna foreign key
        key: "Id",
      },
      validate: {
        notNull: { msg: "OrderId is required" },
        notEmpty: { msg: "OrderId is required" },
      },
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products", // Products tablosuna foreign key
        key: "Id",
      },
      validate: {
        notNull: { msg: "ProductId is required" },
        notEmpty: { msg: "ProductId is required" },
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Quantity is required" },
        min: { args: [1], msg: "Quantity must be at least 1" },
      },
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required" },
        min: { args: [0], msg: "Price must be a positive number" },
      },
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "TotalPrice is required" },
      },
    },
  });

  return OrderDetails;
};
