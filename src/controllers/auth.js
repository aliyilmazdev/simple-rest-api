const Auth = require("../models/auth.js");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    const passwordHash = await brcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      user: newUser,
      token: userToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await brcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({
        message: "Incorrect password",
        success: false,
      });
    }
    const userToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      user: user,
      token: userToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
