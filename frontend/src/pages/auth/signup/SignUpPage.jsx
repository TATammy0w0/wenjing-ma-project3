import { Link } from "react-router-dom";
import { useState } from "react";

import YSvg from "../../../components/svgs/Y";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  // get data from backend
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto flex h-screen px-20 gap-16">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <Link to="/">
          <YSvg className=" lg:w-3/4 fill-white" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex w-full flex-col border-opacity-50">
          <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
            <Link to="/">
              <YSvg className="w-20 lg:hidden fill-white" />
            </Link>
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

            <label className="input input-bordered rounded flex items-center gap-2">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="full name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>

            <label className="input input-bordered rounded flex items-center gap-2">
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

            <label className="input input-bordered rounded flex items-center gap-2">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="new password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>

            <button className="btn rounded-full btn-primary text-white w-full">
              {isPending ? "Loading..." : "Create Account"}
            </button>
            {/* Use react hot toast to handle error message instead. */}
            {/* {isError && <p className="text-red-500">{error.message}</p>} */}
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
