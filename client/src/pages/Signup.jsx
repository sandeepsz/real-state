import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { OAuth } from "../components/OAuth.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    navigate("/sign-in");
    toast.success("Account created successfully");

    if (data.success == false) {
      setLoading(false);
      toast.error("email or username already exists");
      return;
    }
    setLoading(false);
  };
  return (
    <div className="px-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          required
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handleChnage}
        />
        <input
          required
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChnage}
        />
        <input
          required
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChnage}
        />
        <button
          disabled={loading}
          className="bg-[#003b36] p-3 text-white  uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p> already Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
