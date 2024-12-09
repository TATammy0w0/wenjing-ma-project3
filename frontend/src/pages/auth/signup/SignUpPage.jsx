import { Link } from "react-router-dom";
import { useState } from "react";

import YSvg from "../../../components/svgs/Y";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-20">
      <div className="flex-1 hidden lg:flex items-center  justify-center pr-10">
        <YSvg className=" lg:w-3/4 fill-white" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center pl-10">
        <div className="flex w-full flex-col border-opacity-50">
          <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
            <YSvg className="w-16 lg:hidden fill-white" />
            <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>
            <div className="flex gap-4 flex-wrap">
              <label className="input input-bordered rounded flex items-center gap-2 flex-1">
                <FaUser />
                <input
                  type="text"
                  className="grow "
                  placeholder="username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </label>
            </div>
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>
            <button className="btn rounded-full btn-primary text-white w-full">
              Create Account
            </button>
            {isError && <p className="text-red-500">Something went wrong</p>}
          </form>

          <div className="divider">or</div>

          <div className="flex flex-col gap-4 mt-2">
            <p className="text-white text-lg">Already have an account?</p>
            <Link to="/login">
              <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
