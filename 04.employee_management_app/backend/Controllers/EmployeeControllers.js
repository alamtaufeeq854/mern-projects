const Employee = require("../Models/EmployeeModel.js");

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    if (!name || !email || !phone || !department || !salary) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const body = { ...req.body };

    if (req.file) {
      body.profileImage = req.file.path;
    } else {
      delete body.profileImage;
    }
    const emp = new Employee(body);
    await emp.save();

    res.status(201).json({
      message: "Employee Created !",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    if (!name && !email && !phone && !department && !salary && !req.file) {
      return res.status(400).json({
        message: "At least one field is required.",
        success: false,
      });
    }

    const body = req.body;

    if (req.file) {
      body.profileImage = req.file ? req.file?.path : null;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found!",
        success: false,
      });
    }

    res.status(200).json({
      message: "Employee Updated !",
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    let skip = (page - 1) * limit;

    let searchCriteria = {};

    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i",
        },
      };
    }

    const totalEmployees = await Employee.countDocuments(searchCriteria);

    const employees = await Employee.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);

    if (employees.length === 0) {
      return res.status(404).json({
        message: "Employees not found !",
        success: false,
      });
    }
    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: employees,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found !",
        success: false,
      });
    }
    res.status(200).json({
      message: "Get Employee Details",
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found !",
        success: false,
      });
    }

    res.status(200).json({
      message: "Employee Deleted Successfully !",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
