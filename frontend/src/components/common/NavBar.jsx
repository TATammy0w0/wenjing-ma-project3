import YSvg from "../svgs/Y";

import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  //const data = undefined;
  const data = {
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy1.jpg",
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 flex border-b border-gray-700 z-10">
      <div className="flex-1">
        <Link to="/" className="flex justify-center md:justify-start">
          <YSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
      </div>

      <div className="flex-none gap-2">
        {/* Search bar */}
        {/* <label className="input input-bordered rounded flex items-center gap-2 navbar-center">
          <FaSearch />
          <input
            type="text"
            className="grow"
            placeholder="username"
            name="username"
          />
        </label> */}

        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Profile Image" src="../public/avatar-placeholder.png" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-20 p-2 shadow"
          >
            <li>
              <Link to="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
          </ul>
        </div> */}

        {/* Show user profile when user logged in */}
        {data && (
          <Link
            to={`/profile/${data.username}`}
            className="flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={data?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {data?.fullName}
                </p>
                <p className="text-slate-500 text-sm">@{data?.username}</p>
              </div>
              {/* <BiLogOut className="w-5 h-5 cursor-pointer" /> */}
            </div>
          </Link>
        )}

        {/* Show log in and sign up buttons when user not logged in */}
        {!data && (
          <div className="flex gap-2">
            <Link to="/login">
              <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
