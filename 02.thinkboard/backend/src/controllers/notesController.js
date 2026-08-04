import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Newest to First

    if (!notes) {
      return res.status(404).json({ message: "Notes Not Found !" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes Controller", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note Not Found !" });
    }
    res.status(200).json({ message: "Note Found Successfully !", note });
  } catch (error) {
    console.log("Error in getNoteById Controller", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required!",
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Content is required!",
      });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json({ message: "Note Created Successfully !", newNote });
  } catch (error) {
    console.log("Error in createNote Controller", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (title === "") {
      return res.status(400).json({ message: "Title is Required !" });
    }
    if (content === "") {
      return res.status(400).json({ message: "Content is Required !" });
    }
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: "Note Not Found !" });
    }
    res.status(200).json({ message: "Note Updated Successfully !", note });
  } catch (error) {
    console.log("Error in updateNote Controller", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note Not Found !" });
    }
    res.status(200).json({ message: "Note Deleted Successfully !" });
  } catch (error) {
    console.log("Error in deleteNote Controller", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};
