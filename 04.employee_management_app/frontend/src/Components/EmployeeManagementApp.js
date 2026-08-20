import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { GetAllEmployees, deleteEmployeeById } from "../api.js";
import AddEmployee from "./AddEmployee.js";
import { notify } from "../utils.js";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employees: [],

    pagination: {
      totalEmployees: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchEmployee(term);
  };

  const handleUpdateEmployee = (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModal(true);
  };

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const fetchEmployee = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await GetAllEmployees(search, page, limit);
      setEmployeeData(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDeleteEmployee = async (emp) => {
    try {
      const { success, message } = await deleteEmployeeById(emp._id);
      if (success) {
        notify(message, "success");
        fetchEmployee();
      } else {
        notify(message, "error");
      }
    } catch (error) {
      console.log(error);
      notify("Failed to Delete Employee ! Try again later.", "error");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <Link
        to="https://alamtaufeeq854.github.io/mern-projects/"
        className="me-auto mb-3 btn btn-secondary border-0 rounded">
        Back
      </Link>
      <h1>Employee Management App</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p3" style={{ width: "100%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              onClick={() => {
                handleAddEmployee();
              }}
              className="btn btn-primary">
              Add
            </button>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Employee"
              className="form-control w-50"
            />
          </div>

          <EmployeeTable
            employees={employeeData?.employees ?? []}
            pagination={employeeData?.pagination ?? {}}
            fetchEmployee={fetchEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
            handleUpdateEmployee={handleUpdateEmployee}
          />
          <AddEmployee
            updateEmpObj={updateEmpObj}
            showModal={showModal}
            setShowModal={setShowModal}
            fetchEmployee={fetchEmployee}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
