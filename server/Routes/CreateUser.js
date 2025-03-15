const express = require("express");

const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const jwtSecret = "MynameisSajjaFullStackWebDev";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 2 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bycrypt.genSalt(10);
    let secPassword = await bycrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try loggin in with correct credentials" });
      }
      const pwdCompare = await bycrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: " Please Try to login in with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
