import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await loginUser(form.username, form.password);
      if (res.message === "Login success") {
        localStorage.setItem("loggedIn", "true");
        nav("/");
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
