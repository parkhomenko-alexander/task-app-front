import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../api/AuthService";

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("zxc");
  const [email, setEmail] = useState("zxc@zxc.ru");
  const [phone, setPhone] = useState("11111111111");
  const [password, setPassword] = useState("zxc");
  const [confirmPassword, setConfirmPassword] = useState("zxc");
  const [timezone, setTimezone] = useState("Europe/Moscow");

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await AuthService.register(
      username,
      email,
      phone,
      timezone,
      password,
      confirmPassword
    );
    alert("Registration successful!");
    navigate("/auth/login");
  } catch (err) {
    alert(`Registration failed: ${(err as Error).message}`);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 bg-gray-800 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">Register</h1>

        <input
          className="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 mb-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
