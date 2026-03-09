const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

router.post("/create-admin", adminController.createAdmin);
router.post("/login", adminController.loginAdmin);
router.put("/update-admin", protect, adminController.updateAdmin);

module.exports = router;