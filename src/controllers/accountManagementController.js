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

exports.createAdmin = async (req, res) => {
  try {
    const { username, password, role, status, email } = req.body;

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role,
      status,
      email
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      data: newAdmin
    });

  } catch (error) {

    // handle validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};