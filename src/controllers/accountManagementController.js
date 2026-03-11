const Admin = require("../models/superAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllAdmins = async (req, res) => {
  try {

    const admins = await Admin.find().select("-password");

    const totalUsers = admins.length;

    const adminCount = admins.filter(a => a.role === "admin").length;

    const superAdminCount = admins.filter(a => a.role === "superAdmin").length;

    res.json({
      "Total Users": totalUsers,
      "Admin": adminCount,
      "superAdmin": superAdminCount,
      admins
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching admins",
      error: error.message
    });
  }
};