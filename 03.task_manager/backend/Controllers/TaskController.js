const TaskModel = require("../Models/TaskModel");

const fetchAllTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "Tasks not found", success: false });
    }

    res.status(200).json({ message: "All Tasks", success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", success: false });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ message: "Task is Created !", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    res.status(200).json({ message: "Task Updated !", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    res.status(200).json({ message: "Task Deleted !", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTask,
  updateTaskById,
  deleteTaskById,
};
