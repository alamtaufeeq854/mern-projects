const UserModel = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User with this email is already registered !",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      name,
    });

    res.status(201).json({
      message: "SignUp Successfully !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "Invalid email or password!",
        success: false,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({
        message: "Invalid email or password!",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login Successfully !",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { Signup, Login };
