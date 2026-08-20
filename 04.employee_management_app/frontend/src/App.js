import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeManagementApp from "./Components/EmployeeManagementApp.js";
import EmployeeDetails from "./Components/EmployeeDetails.js";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
