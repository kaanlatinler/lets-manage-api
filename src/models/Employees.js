module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define("Employees", {
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
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "LastName is required" },
        notEmpty: { msg: "LastName is required" },
      },
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone is required" },
        notEmpty: { msg: "Phone is required" },
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Must be a valid email" },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
      },
    },
    Point: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RoleId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    BusinessId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    GenderId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  return Employees;
};
