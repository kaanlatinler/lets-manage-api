module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
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
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      },
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required" },
        notEmpty: { msg: "Price is required" },
      },
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image is required" },
        notEmpty: { msg: "Image is required" },
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
  return Products;
};
