import express, { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Creates a new book and stores it in the MongoDB database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishYear
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atomic Habits"
 *               author:
 *                 type: string
 *                 example: "James Clear"
 *               publishYear:
 *                 type: integer
 *                 example: 2018
 *     responses:
 *       201:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Book Created Successfully"
 *               book:
 *                 _id: "68910c1af84f9b5d83f07b92"
 *                 title: "Atomic Habits"
 *                 author: "James Clear"
 *                 publishYear: 2018
 *                 createdAt: "2026-07-29T11:20:00.000Z"
 *                 updatedAt: "2026-07-29T11:20:00.000Z"
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             example:
 *               message: "Send all required fields: title, author and publishYear"
 *       500:
 *         description: Internal server error.
 */

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title,author and publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send({
      message: `Book Created Successfully`,
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Retrieve all books from the MongoDB database.
 *     responses:
 *       200:
 *         description: Books fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Books Found Successfully"
 *               totalBooks: 2
 *               books:
 *                 - _id: "68910c1af84f9b5d83f07b92"
 *                   title: "Atomic Habits"
 *                   author: "James Clear"
 *                   publishYear: 2018
 *                 - _id: "68910c1af84f9b5d83f07b93"
 *                   title: "Clean Code"
 *                   author: "Robert C. Martin"
 *                   publishYear: 2008
 *       404:
 *         description: No books found.
 *       500:
 *         description: Internal server error.
 */

router.get("/", async (req, res) => {
  const books = await Book.find({});

  if (!books) {
    return res.status(404).send({
      message: `Books not found`,
    });
  }

  return res.status(200).send({
    message: `Books Found Successfully`,
    totalBooks: books.length,
    books,
  });
});
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get book by ID
 *     description: Retrieve a single book using its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68910c1af84f9b5d83f07b92"
 *     responses:
 *       200:
 *         description: Book fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Book Found Successfully"
 *               book:
 *                 _id: "68910c1af84f9b5d83f07b92"
 *                 title: "Atomic Habits"
 *                 author: "James Clear"
 *                 publishYear: 2018
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).send({
      message: `Book not found`,
    });
  }

  return res.status(200).send({
    message: `Book Found Successfully`,
    book,
  });
});
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     description: Update an existing book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68910c1af84f9b5d83f07b92"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishYear
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code"
 *               author:
 *                 type: string
 *                 example: "Robert C. Martin"
 *               publishYear:
 *                 type: integer
 *                 example: 2008
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Book Updated Successfully"
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             example:
 *               message: "Send all required fields: title, author and publishYear"
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body.title || !req.body.author || !req.body.publishYear) {
    return res.status(400).send({
      message: "Send all required fields: title,author and publishYear",
    });
  }

  const book = await Book.findByIdAndUpdate(id, req.body);

  if (!book) {
    return res.status(404).send({
      message: `Book not found`,
    });
  }

  return res.status(200).send({
    message: `Book Updated Successfully`,
  });
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     description: Delete a book using its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68910c1af84f9b5d83f07b92"
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Book Deleted Successfully"
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return res.status(404).send({
      message: `Book not found`,
    });
  }

  return res.status(200).send({
    message: `Book Deleted Successfully`,
  });
});

export default router;
