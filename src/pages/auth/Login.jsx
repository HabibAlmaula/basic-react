import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login({ email, password });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Login error: " + err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    handleLogin();
  };

  return (
    <div className="w-full h-screen fixed inset-0 overflow-hidden flex items-center justify-center flex-wrap">
      <div className="flex flex-col w-full max-w-md bg-slate-300 rounded-md p-5">
        <h1 className="font-bold text-xl mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
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
                "Login"
              )}
            </span>
          </button>
          <p className="mt-5">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
