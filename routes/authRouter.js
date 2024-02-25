const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
require("dotenv").config();

// Update user role

const userId = "";

const updateUserRole = async () => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: "admin" } },
      { new: true }
    ).exec();

    console.log("Uloga admina uspešno dodana:", updatedUser);
  } catch (err) {
    console.error("Greška prilikom ažuriranja korisnika:", err);
  } finally {
    mongoose.disconnect();
  }
};

// updateUserRole();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user.role === "user") {
      res.json({ user, message: "You are logged in as a regular user" });
    }

    if (user.role === "admin") {
      res.json({ user, message: "You are logged in as an admin" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User doesn't exist" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
