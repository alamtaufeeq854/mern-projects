import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackHomeButton = () => {
  return (
    <div className="flex">
      <Link
        to="https://alamtaufeeq854.github.io/mern-projects/"
        className="bg-indigo-800 text-white px-4 py-1 rounded-lg w-fit">
        Back
      </Link>
    </div>
  );
};

export default BackHomeButton;
