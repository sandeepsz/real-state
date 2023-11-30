import { FcGoogle } from "react-icons/fc";

import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    </div>
  );
};

export default SignIn;
