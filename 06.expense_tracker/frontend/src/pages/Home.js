import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpensesTable.js";
import ExpenseTrackerForm from "./ExpenseTrackerForm.js";
import ExpenseDetails from "./ExpenseDetails.js";

const Home = () => {
  let [loggedInUser, setLoggedInUser] = useState("");
  let [expenses, setExpenses] = useState([]);
  let [expensesAmt, setExpensesAmt] = useState(0);
  let [incomeAmt, setIncomeAmt] = useState(0);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchExpenses = async () => {
    try {
      const url = "https://expense-tracker-backend-gz09.onrender.com/expenses";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  };

  const addExpenses = async (data) => {
    try {
      const url = "https://expense-tracker-backend-gz09.onrender.com/expenses";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const url = `https://expense-tracker-backend-gz09.onrender.com/expenses/${expenseId}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    fetchExpenses();
  }, []);

  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);

    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;

    setExpensesAmt(exp);
    setIncomeAmt(income);
  }, [expenses]);

  return (
    <div>
      <div className="user-section">
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ExpenseDetails incomeAmt={incomeAmt} expensesAmt={expensesAmt} />
      <ExpenseTrackerForm addExpenses={addExpenses} />
      <ExpensesTable
        expenses={expenses}
        handleDeleteExpense={handleDeleteExpense}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
