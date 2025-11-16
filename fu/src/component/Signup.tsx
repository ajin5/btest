import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message?: string;
  user?: any; // Optional: replace 'any' with your user type
}

function Signup() {
  const [form, setForm] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5300/ad/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData: SignupResponse = await response.json();
        setMessage(errorData.message || "Signup failed");
        setLoading(false);
        return;
      }

      const data: SignupResponse = await response.json();
      setMessage(data.message || "Signup successful");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage("Network error, please try again");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "10px", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;
