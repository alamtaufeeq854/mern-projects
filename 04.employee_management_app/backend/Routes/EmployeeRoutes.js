const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
} = require("../Controllers/EmployeeControllers.js");
const { cloudinaryFileUploader } = require("../Middlewares/FileUploader.js");

const routes = require("express").Router();

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - department
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Kumar
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               department:
 *                 type: string
 *                 example: IT
 *               salary:
 *                 type: string
 *                 example: "50000"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee Created !
 *               success: true
 *
 *       400:
 *         description: Required fields are missing
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required.
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               success: false
 */

routes.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         example: 5
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: Rahul
 *
 *     responses:
 *       200:
 *         description: Employees fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: All Employees
 *               success: true
 *               data:
 *                 employees:
 *                   - _id: 66c123456789abcdef123456
 *                     name: Rahul Kumar
 *                     email: rahul@gmail.com
 *                     phone: "9876543210"
 *                     department: IT
 *                     profileImage: "https://example.com/profile.png"
 *                     salary: "50000"
 *                     createdAt: "2026-08-20T12:00:00.000Z"
 *                     updatedAt: "2026-08-20T12:00:00.000Z"
 *                 pagination:
 *                   totalEmployees: 10
 *                   currentPage: 1
 *                   totalPages: 2
 *                   pageSize: 5
 *
 *       404:
 *         description: Employees not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employees not found !
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               success: false
 */

routes.get("/", getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66c123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             example:
 *               message: Get Employee Details
 *               success: true
 *               data:
 *                 _id: 66c123456789abcdef123456
 *                 name: Rahul Kumar
 *                 email: rahul@gmail.com
 *                 phone: "9876543210"
 *                 department: IT
 *                 profileImage: "https://example.com/profile.png"
 *                 salary: "50000"
 *
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found !
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               success: false
 */

routes.get("/:id", getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66c123456789abcdef123456
 *
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Kumar
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               department:
 *                 type: string
 *                 example: IT
 *               salary:
 *                 type: string
 *                 example: "60000"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee Updated !
 *               success: true
 *
 *       400:
 *         description: No field provided
 *         content:
 *           application/json:
 *             example:
 *               message: At least one field is required.
 *               success: false
 *
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found!
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               success: false
 */

routes.put(
  "/:id",
  cloudinaryFileUploader.single("profileImage"),
  updateEmployeeById,
);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66c123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee Deleted Successfully !
 *               success: true
 *
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found !
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 *               success: false
 */

routes.delete("/:id", deleteEmployeeById);

module.exports = routes;
