const {
  createTask,
  fetchAllTask,
  updateTaskById,
  deleteTaskById,
} = require("../Controllers/TaskController");

const router = require("express").Router();

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     description: Fetch all tasks from the database.
 *     tags:
 *       - Tasks
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: All Tasks
 *               success: true
 *               tasks:
 *                 - _id: 64f1a2b3c4d5e6f789012345
 *                   taskName: Learn Swagger
 *                   isDone: false
 *                 - _id: 64f1a2b3c4d5e6f789012346
 *                   taskName: Complete Task Manager
 *                   isDone: true
 *
 *       404:
 *         description: No tasks found
 *         content:
 *           application/json:
 *             example:
 *               message: Tasks not found
 *               success: false
 *
 *       500:
 *         description: Failed to fetch tasks
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch tasks
 *               success: false
 */
router.get("/", fetchAllTask);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with a task name and completion status.
 *     tags:
 *       - Tasks
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Task"
 *           example:
 *             taskName: Learn Swagger
 *             isDone: false
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task is Created !
 *               success: true
 *
 *       500:
 *         description: Failed to create task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create task
 *               success: false
 */
router.post("/", createTask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task using its MongoDB ID.
 *     tags:
 *       - Tasks
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the task
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f789012345
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Task"
 *           example:
 *             taskName: Learn OpenAPI
 *             isDone: true
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task Updated !
 *               success: true
 *
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task not found
 *               success: false
 *
 *       500:
 *         description: Failed to update task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to update task
 *               success: false
 */
router.put("/:id", updateTaskById);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete an existing task using its MongoDB ID.
 *     tags:
 *       - Tasks
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the task
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f789012345
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task Deleted !
 *               success: true
 *
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task not found
 *               success: false
 *
 *       500:
 *         description: Failed to delete task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to Delete task
 *               success: false
 */
router.delete("/:id", deleteTaskById);

module.exports = router;
