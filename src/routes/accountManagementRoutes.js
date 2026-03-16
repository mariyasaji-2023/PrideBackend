const express = require("express");
const router = express.Router();
const accountManagementController = require("../controllers/accountManagementController");
const protect = require("../middleware/authMiddleware");

router.get("/all-admins", protect, accountManagementController.getAllAdmins);
router.post("/create-admin",protect,accountManagementController.createAdmin)

module.exports = router;