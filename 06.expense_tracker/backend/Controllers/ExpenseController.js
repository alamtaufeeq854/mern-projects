const UserModel = require("../Models/User.js");

const addExpense = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $push: { expenses: body },
      },
      {
        new: true,
      },
    );

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense Added Successfully !",
      success: true,
      data: userData.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};

const fetchExpense = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  try {
    const userData = await UserModel.findById({ _id }).select("expenses");

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expenses Fetched Successfully !",
      success: true,
      data: userData?.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};
const deleteExpense = async (req, res) => {
  const { _id } = req.user;
  const expenseId = req.params.id;

  try {
    const userData = await UserModel.findOneAndUpdate(
      {
        _id: _id,
        "expenses._id": expenseId,
      },
      {
        $pull: {
          expenses: {
            _id: expenseId,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!userData) {
      return res.status(404).json({
        message: "Expense not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense Deleted Successfully!",
      success: true,
      data: userData.expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
};
module.exports = {
  addExpense,
  fetchExpense,
  deleteExpense,
};
