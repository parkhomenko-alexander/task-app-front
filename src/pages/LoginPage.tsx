import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("zxc@zxc.ru");
  const [password, setPassword] = useState("zxc");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth?.login(email, password);
      alert("Login successful!");
      navigate("/tasks");
    } catch (err) {
      alert(`Login failed: ${(err as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-gray-800 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">Login</h1>

        <input
          className="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
