const express = require("express");
const router = express.Router();
const accountManagementController = require("../controllers/accountManagementController");
const protect = require("../middleware/authMiddleware");

router.get("/all-admins", protect, accountManagementController.getAllAdmins);
router.post("/create-admin",protect,accountManagementController.createAdmin);
router.delete("/admin/:id",protect,accountManagementController.deleteAdmin)
router.put("/admin/:id",protect,accountManagementController.updateAdmin)


module.exports = router;