const express = require("express");
const router = express.Router();
const adminController = require("../controllers/superAdminController");
const protect = require("../middleware/authMiddleware");

router.post("/create-admin", adminController.createAdmin);
router.post("/login", adminController.loginAdmin);
router.put("/update-admin", protect, adminController.updateAdmin);
router.get("/getAdminDetails",protect,adminController.getAdminProfile)

module.exports = router;