import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({
  pagination,
  employees,
  fetchEmployee,
  handleDeleteEmployee,
  handleUpdateEmployee,
}) => {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination || {};
  const TableRow = ({ employee }) => {
    return (
      <tr >
        <td>
          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none">
            {employee.name}
          </Link>
        </td>

        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td className="d-flex flex-row">
          <i
            className="bi bi-pencil-fill text-warning me-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => {
              handleUpdateEmployee(employee);
            }}></i>

          <i
            className="bi bi-trash-fill text-danger me-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => {
              handleDeleteEmployee(employee);
            }}></i>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePagination = (currPage) => {
    fetchEmployee("", currPage, 5);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => <TableRow key={emp._id} employee={emp} />)
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary m-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => {
            handlePrevPage();
          }}
          disabled={currentPage === 1}>
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            onClick={() => {
              handlePagination(page);
            }}
            className={`btn btn-outline-primary me-1 ${currentPage === page ? "active" : ""}`}>
            {page}
          </button>
        ))}

        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => {
            handleNextPage();
          }}
          disabled={totalPages === currentPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
