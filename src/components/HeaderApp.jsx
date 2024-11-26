import { useNavigate } from "react-router-dom";

function HeaderApp() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 
          className="text-2xl font-semibold cursor-pointer transition-all duration-200 hover:text-blue-600 hover:scale-105"
          onClick={() => navigate("/")}
        >
          Simple Note App
        </h1>
        <h1 className="text-2xl font-semibold transition-all duration-200 hover:text-gray-600">
          Dicoding Submission
        </h1>
      </div>
      <hr className="my-5" />
    </>
  );
}

export default HeaderApp;