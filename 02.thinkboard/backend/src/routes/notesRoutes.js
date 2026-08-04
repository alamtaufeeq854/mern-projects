import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get all notes
 *
 *     responses:
 *       200:
 *         description: List of notes
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               - _id: 68903d71
 *                 title: Learn Express
 *                 content: Routing
 *
 *               - _id: 68903d72
 *                 title: Learn MongoDB
 *                 content: Aggregation
 *
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *
 *     summary: Get note by id
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68903d71f3d9a8d95d1f8c1d
 *
 *     responses:
 *
 *       200:
 *         description: Note Found
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Found Successfully !
 *               note:
 *                 _id: 68903d71
 *                 title: Learn Swagger
 *                 content: Swagger Docs
 *
 *       404:
 *         description: Note Not Found
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Not Found !
 */
router.get("/:id", getNoteById);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a new note
 *     description: Creates a new note in the database.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNote'
 *
 *           examples:
 *             Basic:
 *               summary: Basic Example
 *               value:
 *                 title: Learn Swagger
 *                 content: Swagger is awesome.
 *
 *             LongNote:
 *               summary: Long Content
 *               value:
 *                 title: MERN Roadmap
 *                 content: Complete Express backend then React frontend.
 *
 *     responses:
 *
 *       201:
 *         description: Note created successfully
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Created Successfully !
 *               newNote:
 *                 _id: 68903d71f3d9a8d95d1f8c1d
 *                 title: Learn Swagger
 *                 content: Swagger is awesome.
 *                 createdAt: 2026-08-04T12:20:00Z
 *                 updatedAt: 2026-08-04T12:20:00Z
 *
 *
 *       400:
 *         description: Validation Error
 *
 *         content:
 *           application/json:
 *
 *             examples:
 *
 *               MissingTitle:
 *                 value:
 *                   message: Title is required!
 *
 *               MissingContent:
 *                 value:
 *                   message: Content is required!
 *
 *
 *       500:
 *         description: Internal Server Error
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Internal Server Error !
 */
router.post("/", createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     tags:
 *       - Notes
 *     summary: Update a note
 *     description: Update the title and content of an existing note.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the note
 *         schema:
 *           type: string
 *         example: 68903d71f3d9a8d95d1f8c1d
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNote'
 *
 *           examples:
 *             UpdateTitle:
 *               summary: Update title and content
 *               value:
 *                 title: Updated Swagger Guide
 *                 content: Learn OpenAPI 3.0 with Express.
 *
 *             UpdateContent:
 *               summary: Another Example
 *               value:
 *                 title: MERN Backend
 *                 content: Complete CRUD APIs using Express and MongoDB.
 *
 *     responses:
 *
 *       200:
 *         description: Note updated successfully
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Updated Successfully !
 *               note:
 *                 _id: 68903d71f3d9a8d95d1f8c1d
 *                 title: Updated Swagger Guide
 *                 content: Learn OpenAPI 3.0 with Express.
 *                 createdAt: 2026-08-04T12:20:00Z
 *                 updatedAt: 2026-08-04T12:35:00Z
 *
 *       400:
 *         description: Validation Error
 *
 *         content:
 *           application/json:
 *
 *             examples:
 *
 *               EmptyTitle:
 *                 value:
 *                   message: Title is Required !
 *
 *               EmptyContent:
 *                 value:
 *                   message: Content is Required !
 *
 *       404:
 *         description: Note Not Found
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Not Found !
 *
 *       500:
 *         description: Internal Server Error
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Internal Server Error !
 */
router.put("/:id", updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete a note
 *     description: Delete a note using its MongoDB ObjectId.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the note
 *         schema:
 *           type: string
 *         example: 68903d71f3d9a8d95d1f8c1d
 *
 *     responses:
 *
 *       200:
 *         description: Note deleted successfully
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Deleted Successfully !
 *
 *       404:
 *         description: Note Not Found
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Note Not Found !
 *
 *       500:
 *         description: Internal Server Error
 *
 *         content:
 *           application/json:
 *
 *             example:
 *               message: Internal Server Error !
 */
router.delete("/:id", deleteNote);

export default router;
