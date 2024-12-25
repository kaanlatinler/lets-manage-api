const express = require("express");
const cors = require("cors");
const sequelize = require("./src/utils/database");

const PORT = require("./src/cfg/cfg").port || 3000;
const version = require("./package.json").version;

const app = express();

const authRoutes = require("./src/routes/auth/authRoutes");
const businessRoutes = require("./src/routes/crud/business/businessRoutes");
const ownerRoutes = require("./src/routes/crud/owner/ownerRoutes");
const employeeRoutes = require("./src/routes/crud/employee/employeeRoutes");
const genderRoutes = require("./src/routes/crud/gender/genderRoutes");
const roleRoutes = require("./src/routes/crud/role/roleRoutes");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.path}`);
  next();
});

app.use(`/${version}/auth`, authRoutes);
app.use(`/${version}/business`, businessRoutes);
app.use(`/${version}/owner`, ownerRoutes);
app.use(`/${version}/employee`, employeeRoutes);
app.use(`/${version}/gender`, genderRoutes);
app.use(`/${version}/role`, roleRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
