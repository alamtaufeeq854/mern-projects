import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);

    setUserInfo(userData);
  }, []);

  const handleLogin = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  return (
    <div className="content">
      <h1>Welcome {userInfo?.name} !</h1>
      <h3>Email: {userInfo?.email}</h3>
      <img src={userInfo?.image} alt={userInfo?.email} />
      <button onClick={handleLogin}>Logout</button>
    </div>
  );
};

export default DashBoard;
