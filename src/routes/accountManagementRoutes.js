const express = require("express");
const router = express.Router();
const accountManagementController = require("../controllers/accountManagementController");
const protect = require("../middleware/authMiddleware");

router.get("/all-admins", protect, accountManagementController.getAllAdmins);

module.exports = router;