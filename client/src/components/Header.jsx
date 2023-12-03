import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

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
            <Link to="/profile">
              <img
                className="rounded-full"
                width={35}
                height={35}
                alt="avater"
                src={currentUser.avatar}
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="bg-[#003b36] text-lg px-3 py-1 rounded text-white">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
