import express, { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();

//To Save Books
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

// Get All Books
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

// Get a Book By Id
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

// Update a Book By Id
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

// Delete a Book By Id
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
