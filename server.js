const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pride Backend API Running");
});

const adminRoutes = require("./src/routes/superAdminRoutes");
const accountManagementRoutes = require("./src/routes/accountManagementRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/account", accountManagementRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});