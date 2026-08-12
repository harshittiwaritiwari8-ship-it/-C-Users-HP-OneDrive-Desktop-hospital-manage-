const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

module.exports = router;