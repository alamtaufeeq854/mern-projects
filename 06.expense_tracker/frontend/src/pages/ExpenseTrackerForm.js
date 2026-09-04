import React, { useState } from "react";
import { handleError } from "../utils";

const ExpenseTrackerForm = ({ addExpenses }) => {
  const [expenseInfo, setExpenseInfo] = useState({
    text: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let copyExpenseInfo = { ...expenseInfo };
    copyExpenseInfo[name] = value;
    setExpenseInfo(copyExpenseInfo);
  };

  const handleExpense = (e) => {
    e.preventDefault();
    const { text, amount } = expenseInfo;
    if (!text || !amount) {
      handleError("All Fields are required !");
      return;
    }
    addExpenses(expenseInfo);
    setTimeout(() => {
      setExpenseInfo({ text: "", amount: "" });
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleExpense}>
        <div>
          <label htmlFor="text">Expense Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your Expense Description..."
            value={expenseInfo.text}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter your Amount, Expense(-ve) Income(+ve)..."
            value={expenseInfo.amount}
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseTrackerForm;
