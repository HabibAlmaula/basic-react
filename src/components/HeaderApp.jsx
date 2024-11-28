import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { TbLogout } from "react-icons/tb";
import { home } from "../routes/routes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function HeaderApp() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  console.log(`user: ${JSON.stringify(user)}`);

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1
          className="text-2xl font-semibold cursor-pointer transition-all duration-200 hover:text-blue-600 hover:scale-105"
          onClick={() => navigate(home)}
        >
          Simple Note App
        </h1>
        <div className="flex gap-5 items-center">
          {user ? (
            <h1 className="text-2xl font-semibold transition-all duration-200 hover:text-gray-600">
              Hi, {user.name}
            </h1>
          ) : (
            <AiOutlineLoading3Quarters className="animate-spin object-contain" />
          )}
          <TbLogout
            className="text-2xl font-semibold cursor-pointer transition-all duration-200 hover:text-red-600 hover:scale-105"
            onClick={handleLogout}
          />
        </div>
      </div>
      <hr className="my-5" />
    </>
  );
}

export default HeaderApp;
