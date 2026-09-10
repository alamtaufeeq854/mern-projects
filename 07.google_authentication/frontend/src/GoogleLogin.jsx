import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api.js";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, image, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error while requesting google code: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="content">
      <h1><span>Google </span>Authentication</h1>
      <button onClick={googleLogin}>Login With Google</button>
    </div>
  );
};

export default GoogleLogin;
