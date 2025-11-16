import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5300/ad/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.log));
      setMessage("Login successful");
      navigate("/create");
    } catch (err) {
      console.error(err);
      setMessage("Network error, please try again");
    }
  };

  // ✅ JSX return must be at the top level of the component
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
