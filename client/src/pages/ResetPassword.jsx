import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../redux/user/userSlice";

const ResetPassword = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(resetPasswordStart);
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success == false) {
        dispatch(resetPasswordFailure);
        console.log(data.message);
        setLoading(false);
        return;
      }
      dispatch(resetPasswordSuccess);
      navigate("/update-password");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4  max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-6 ">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          required
          placeholder="email"
          type="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-[#003b36] p-3 text-white  uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
