import React from "react";

const ExpenseDetails = ({ incomeAmt, expensesAmt }) => {
  return (
    <div>
      <div>Your Balance is {incomeAmt - expensesAmt}</div>

      <div className="amounts-container">
        Income
        <span className="Income-amount">{incomeAmt}</span>
        Expense
        <span className="expense-amount">{expensesAmt}</span>
      </div>
    </div>
  );
};

export default ExpenseDetails;
