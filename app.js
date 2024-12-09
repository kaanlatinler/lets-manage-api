const express = require("express");
const cors = require("cors");
const sequelize = require("./src/utils/database");

const PORT = require("./src/cfg/cfg").port || 3000;
const version = require("./package.json").version;

const app = express();

const authRoutes = require("./src/routes/auth/authRoutes");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.path}`);
  next();
});

app.use(`/${version}/auth`, authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
