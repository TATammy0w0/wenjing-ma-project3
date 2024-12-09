import React from "react";
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="flex-none gap-2">
        <label className="input input-bordered rounded flex items-center gap-2 navbar-center">
          <FaSearch />
          <input
            type="text"
            className="grow"
            placeholder="username"
            name="username"
          />
        </label>

        <div className="dropdown dropdown-end">
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
