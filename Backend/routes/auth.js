const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersSchema'); 


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

   
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    
    res.status(200).json({
      message: "Login successful",
      token, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        department: user.department,
        role: user.role,
        token: token, 
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

// register route
router.post("/register", async (req, res) => {
  const { username, email, password, department, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      department,
      role, 
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

module.exports = router;
