const BASE_URL = "https://employee-management-backend-k970.onrender.com";

const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;

  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

const createEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;

  try {
    const formData = new FormData();

    for (const key in empObj) {
      formData.append(key, empObj[key]);
    }

    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: formData,
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

const updateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api/employees/${id}`;

  try {
    const formData = new FormData();

    for (const key in empObj) {
      formData.append(key, empObj[key]);
    }

    const options = {
      method: "PUT",
      "Content-Type": "application/json",
      body: formData,
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

const deleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;

  try {
    const options = {
      method: "DELETE",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();

    const res = await GetAllEmployees();
    console.log(res);
    console.log(res.data);
    return data;
  } catch (error) {
    return error;
  }
};

const getEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;

  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {
  GetAllEmployees,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
};
