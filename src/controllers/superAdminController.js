const Admin = require("../models/superAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create predefined admin
exports.createAdmin = async (req, res) => {
  try {
    const username = "admin";
    const password = "admin123";
    const role = "superAdmin";
    const status = "active";
    const email = "naveen@pride-mma.com";

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
      role,
      status,
      email
    });
    await admin.save();

    res.json({ message: "Admin created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {

    const { username, password, role, status } = req.body;

    const adminId = req.admin.id;
    console.log("Admin from token:", req.admin);
    console.log(adminId)

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (username) admin.username = username;
    if (role) admin.role = role;
    if (status) admin.status = status;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    res.json({
      message: "Admin updated successfully",
      admin
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {

    const adminId = req.admin.id;

    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};