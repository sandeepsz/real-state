import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    navigate("/");
    if (data.success == false) {
      setLoading(false);
      toast.error(data.message);
    }
    setLoading(false);
  };
  return (
    <div className="px-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6 ">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          required
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-[#003b36] p-3 text-white  uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button className=" relative text-lg bg-transparent t border border-[#999999] p-3 rounded-lg">
          <FcGoogle
            size={23}
            style={{ position: "absolute", top: "15px", left: "20px" }}
          />
          Continue with google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>

        <Link to={"/sign-up"}>
          <span className="text-blue-700 ">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
