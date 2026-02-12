import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AuthContainer() {
  const navigate = useNavigate();

  const [isLoginView, setIsLoginView] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // -------------------------
  // helpers (localStorage)
  // -------------------------
  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // -------------------------
  // input change
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  // -------------------------
  // submit
  // -------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = getUsers();

    // ========================
    // REGISTER
    // ========================
    if (!isLoginView) {
      if (formData.password !== formData.confirmPassword) {
        return setError("Passwords do not match");
      }

      const userExists = users.find(
        (u) => u.email === formData.email
      );

      if (userExists) {
        return setError("User already exists. Please login.");
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);
      saveUsers(users);

      localStorage.setItem("token", formData.email);

      alert("Account created successfully!");
      navigate("/dashboard/overview");
    }

    // ========================
    // LOGIN
    // ========================
    else {
      const user = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (!user) {
        return setError("Invalid email or password");
      }

      localStorage.setItem("token", user.email);

      alert("Login successful!");
      navigate("/dashboard/overview");
    }
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-screen items-center justify-center p-4">

      <div className="w-full max-w-md bg-[#10212b] text-white p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginView ? "Login" : "Create Account"}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLoginView && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-blue-800"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-blue-800"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-blue-800"
          />

          {!isLoginView && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded bg-blue-800"
            />
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded"
          >
            {isLoginView ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError("");
            }}
            className="ml-2 underline"
          >
            {isLoginView ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}
