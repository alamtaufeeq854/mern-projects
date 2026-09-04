const {
  fetchExpense,
  addExpense,
  deleteExpense,
} = require("../Controllers/ExpenseController.js");

const router = require("express").Router();

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Fetch all expenses of the authenticated user.
 *     tags: [Expenses]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Expenses Fetched Successfully !"
 *               success: true
 *               data:
 *                 - _id: "68b9f8c123456789abcdef12"
 *                   name: "Food"
 *                   amount: 500
 *                   category: "Food"
 *                   date: "2026-09-04"
 *
 *                 - _id: "68b9f8c123456789abcdef13"
 *                   name: "Travel"
 *                   amount: 1000
 *                   category: "Transport"
 *                   date: "2026-09-03"
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *               success: false
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               success: false
 */
router.get("/", fetchExpense);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     description: Add an expense for the authenticated user.
 *     tags: [Expenses]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddExpenseRequest'
 *
 *     responses:
 *       200:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Expense Added Successfully !"
 *               success: true
 *               data:
 *                 - _id: "68b9f8c123456789abcdef12"
 *                   name: "Food"
 *                   amount: 500
 *                   category: "Food"
 *                   date: "2026-09-04"
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               success: false
 */
router.post("/", addExpense);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Delete an expense using its ID.
 *     tags: [Expenses]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense
 *         schema:
 *           type: string
 *         example: "68b9f8c123456789abcdef12"
 *
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Expense Deleted Successfully!"
 *               success: true
 *               data: []
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Expense not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Expense not found"
 *               success: false
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               error: "Error message"
 *               success: false
 */
router.delete("/:id", deleteExpense);

module.exports = router;
