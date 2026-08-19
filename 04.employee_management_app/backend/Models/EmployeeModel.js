const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png",
    },

    salary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
