const express = require("express");
const router = express.Router();
const User = require("../models/User");

//! GET: GET ALL USERS START
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
});
//! GET: GET ALL USERS END

//! GET: GET ONE USER START
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.status(404).send({ error: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
});
//! GET: GET ONE USER END

//! DELETE: DELETE A USER START
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) return res.status(404).json({ error: "User not found!" });

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error!" });
  }
});
//! DELETE: DELETE A USER END

module.exports = router;
