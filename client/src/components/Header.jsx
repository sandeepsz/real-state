import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const onToggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        toast.error("something went wrong");
        return;
      }
      dispatch(logoutUserSuccess());
      toast.success("Logged out successfully");
    } catch (err) {
      dispatch(logoutUserFailure(err.message));
    }
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-[24px] sm:text-[30px] flex flex-wrap">
            <span className="text-[#5b6547]">Real</span>
            <span className="text-[#003B36]">Estate</span>
          </h1>
        </Link>

        <form
          action=""
          className="bg-slate-100 p-2 rounded-md flex items-center"
        >
          <input
            type="text"
            placeholder="search"
            className="bg-transparent focus:outline-none w-30 sm:w-80"
            onChange={(e) => console.log(e.target.value)}
          />
          <button>
            <IoMdSearch className="text-slate-700" />
          </button>
        </form>

        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-800 hover:underline hover:transition-all ">
              Home
            </li>
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline text-slate-800 hover:underline hover:transition-all"
          >
            <li>About</li>
          </Link>
          {currentUser ? (
            <img
              onClick={onToggle}
              className="rounded-full object-cover"
              width={35}
              alt="profile"
              src={currentUser.avatar}
            />
          ) : (
            <Link to="/sign-in">
              <li className="bg-[#003b36] text-lg px-3 py-1 rounded text-white">
                Sign In
              </li>
            </Link>
          )}
          {isOpen && (
            <div
              className="
                absolute
                rounded-xl
                shadow-md
                w-28
                md:w-40
                bg-white
                hidden-overflow
                right-5
                top-16
                text-sm
                 "
            >
              <Link to="/profile">
                <li onClick={onToggle} className="p-2 hover:bg-slate-100">
                  Profile
                </li>
              </Link>

              <li onClick={handleLogout} className="p-2 cursor-pointer hover:bg-slate-100">
                Log Out
              </li>
            </div>
          )}
        </ul>
      </div>
      <Toaster />
    </header>
  );
};

export default Header;
