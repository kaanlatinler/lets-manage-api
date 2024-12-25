// models/index.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

// Model tanımlamaları
const Businesses = require("./Businesses")(sequelize, DataTypes);
const BusinessOwners = require("./BusinessOwners")(sequelize, DataTypes);
const Employees = require("./Employees")(sequelize, DataTypes);
const Genders = require("./Genders")(sequelize, DataTypes);
const Orders = require("./Orders")(sequelize, DataTypes);
const OrderStatus = require("./OrderStatus")(sequelize, DataTypes);
const Payments = require("./Payments")(sequelize, DataTypes);
const ProductCategories = require("./ProductCategories")(sequelize, DataTypes);
const Products = require("./Products")(sequelize, DataTypes);
const Roles = require("./Roles")(sequelize, DataTypes);
const Tables = require("./Tables")(sequelize, DataTypes);
const TableCategories = require("./TableCategories")(sequelize, DataTypes);
const OrderDetails = require("./OrderDetails")(sequelize, DataTypes);

// İlişkiler

// İşletme Sahipleri ile İşletmeler (1:1)
BusinessOwners.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasOne(BusinessOwners, { foreignKey: "BusinessId" });

// Çalışanlar ile İşletmeler (N:1)
Employees.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasMany(Employees, { foreignKey: "BusinessId" });

// Çalışanlar ile Cinsiyet (N:1)
Employees.belongsTo(Genders, { foreignKey: "GenderId" });
Genders.hasMany(Employees, { foreignKey: "GenderId" });

// Çalışanlar ile Roller (N:1)
Employees.belongsTo(Roles, { foreignKey: "RoleId" });
Roles.hasMany(Employees, { foreignKey: "RoleId" });

// Masalar ile İşletmeler (N:1)
Tables.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasMany(Tables, { foreignKey: "BusinessId" });

// Masalar ile Masa Kategorileri (N:1)
Tables.belongsTo(TableCategories, { foreignKey: "CategoryId" });
TableCategories.hasMany(Tables, { foreignKey: "CategoryId" });

// Ürünler ile İşletmeler (N:1)
Products.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasMany(Products, { foreignKey: "BusinessId" });

// Ürünler ile Ürün Kategorileri (N:1)
Products.belongsTo(ProductCategories, { foreignKey: "CategoryId" });
ProductCategories.hasMany(Products, { foreignKey: "CategoryId" });

// Siparişler ile İşletmeler (N:1)
Orders.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasMany(Orders, { foreignKey: "BusinessId" });

// Siparişler ile Çalışanlar (N:1)
Orders.belongsTo(Employees, { foreignKey: "EmployeeId" });
Employees.hasMany(Orders, { foreignKey: "EmployeeId" });

// Siparişler ile Masalar (N:1)
Orders.belongsTo(Tables, { foreignKey: "TableId" });
Tables.hasMany(Orders, { foreignKey: "TableId" });

// Siparişler ile Ürünler (N:1)
OrderDetails.belongsTo(Products, { foreignKey: "ProductId" });
Products.hasMany(OrderDetails, { foreignKey: "ProductId" });

// Siparişler ile Sipariş Durumları (N:1)
Orders.belongsTo(OrderStatus, { foreignKey: "StatusId" });
OrderStatus.hasMany(Orders, { foreignKey: "StatusId" });

Orders.hasMany(OrderDetails, { foreignKey: "OrderId" });
OrderDetails.belongsTo(Orders, { foreignKey: "OrderId" });

// Ödemeler ile İşletmeler (N:1)
Payments.belongsTo(Businesses, { foreignKey: "BusinessId" });
Businesses.hasMany(Payments, { foreignKey: "BusinessId" });

// Ödemeler ile Çalışanlar (N:1)
Payments.belongsTo(Employees, { foreignKey: "EmployeeId" });
Employees.hasMany(Payments, { foreignKey: "EmployeeId" });

// Ödemeler ile Siparişler (N:1)
Payments.belongsTo(Orders, { foreignKey: "OrderId" });
Orders.hasMany(Payments, { foreignKey: "OrderId" });

module.exports = {
  sequelize,
  Businesses,
  BusinessOwners,
  Employees,
  Genders,
  Orders,
  OrderStatus,
  OrderDetails,
  Payments,
  ProductCategories,
  Products,
  Roles,
  Tables,
  TableCategories,
};
