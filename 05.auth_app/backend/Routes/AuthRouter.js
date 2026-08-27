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
 *     description: Creates a new user account after validating the name, email and password.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       description: User registration details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *           example:
 *             name: Taufeeq Alam
 *             email: taufeeq@gmail.com
 *             password: Password123
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
 *         description: User with the email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "User with this email is already registered !"
 *               success: false
 *
 *       500:
 *         description: Bad request or internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request"
 *               success: false
 */

router.post("/signup", signupValidation, Signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user using email and password and returns a JWT token.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       description: User login credentials
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: taufeeq@gmail.com
 *             password: Password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login Successfully !"
 *               success: true
 *               jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
