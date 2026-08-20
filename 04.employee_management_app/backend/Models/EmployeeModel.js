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
        "https://static.vecteezy.com/system/resources/thumbnails/033/051/579/small_2x/user-interface-icon-png.png",
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
