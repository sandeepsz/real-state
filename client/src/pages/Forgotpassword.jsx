import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Forgotpassword = () => {
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      toast.success(data.message);
      const data = await res.json();
      if (data.success == false) {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4  max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-6 ">
        Update Password
      </h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <input
          required
          placeholder="OTP"
          id="code"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-[#003b36] p-3 text-white  uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Reset"}
        </button>
      </form>
      <div className="bg-[#c1edc2] mt-40 text-center p-1 rounded-sm ">
        <p className="text-[#87878b] font-semibold">
          OTP has been sent to your email
        </p>
      </div>
    </div>
  );
};

export default Forgotpassword;
