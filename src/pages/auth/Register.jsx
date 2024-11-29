import { useState } from "react";
import { register } from "../../utils/network-data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../routes/routes";

function Register() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await register({ name, email, password });
      setIsLoading(false);
      navigate(login);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    handleRegister();
  };

  return (
    <div className="w-full h-screen fixed inset-0 overflow-hidden flex items-center justify-center flex-wrap">
      <div className="flex flex-col w-full max-w-md bg-slate-300 rounded-md p-5">
        <h1 className="font-bold text-xl mb-5">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Name"
            className="p-2 rounded-md mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md mb-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-md mb-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md mt-16 w-full hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            <span className="flex justify-center items-center gap-2">
              {isLoading ? (
                <>
                  Loading...
                  <AiOutlineLoading3Quarters className="animate-spin object-contain" />
                </>
              ) : (
                "Register"
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
