import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="px-4  max-w-lg mx-auto mt-10">
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

        <Link to="/reset">
          <p className="text-blue-700 underline mt-1">Forgot password?</p>
        </Link>
        <button
          disabled={loading}
          className="bg-[#003b36] p-3 text-white  uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>

        <Link to={"/sign-up"}>
          <span className="text-blue-700 ">Sign Up</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-600 mt-5">{error}</p>} */}
    </div>
  );
};

export default SignIn;
