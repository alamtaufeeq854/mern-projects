const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,updateEmployeeById
} = require("../Controllers/EmployeeControllers.js");
const { cloudinaryFileUploader } = require("../Middlewares/FileUploader.js");

const routes = require("express").Router();

routes.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);

routes.get("/", getAllEmployees);

routes.get("/:id", getEmployeeById);

routes.put("/:id", cloudinaryFileUploader.single("profileImage"), updateEmployeeById);

routes.delete("/:id", deleteEmployeeById);

module.exports = routes;
