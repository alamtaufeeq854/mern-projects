const { Signup, Login } = require("../Controllers/AuthController.js");

const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation.js");

const router = require("express").Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags: [Authentication]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "SignUp Successfully !"
 *               success: true
 *
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "User with this email is already registered !"
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *               success: false
 */
router.post("/signup", signupValidation, Signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Login user and receive JWT token.
 *     tags: [Authentication]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login Successfully !"
 *               success: true
 *               jwtToken: "eyJhbGciOiJIUzI1NiIs..."
 *               email: "taufeeq@gmail.com"
 *               name: "Taufeeq Alam"
 *
 *       403:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid email or password!"
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *               success: false
 */
router.post("/login", loginValidation, Login);

module.exports = router;
