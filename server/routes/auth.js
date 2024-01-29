const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//! random avatar oluştur.
const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//! Kullanıcı oluşturma (CREATE REGISTER) start
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //* Aynı email'e ait kullanıcı var mı kontrol et...
    const existingUserEmail = await User.findOne({ email });
    const existingUserUsername = await User.findOne({ username });

    if (existingUserEmail) {
      return res
        .status(400)
        .json({ error: "Email address is already registered!" });
    }

    if (existingUserUsername) {
      return res.status(400).json({ error: "Username is already registered!" });
    }

    //* Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: generateRandomAvatar(),
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//! Kullanıcı oluşturma (CREATE REGISTER) end

//! Kullanıcı girişi (LOGIN) start
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//! Kullanıcı girişi (LOGIN) end

module.exports = router;
