import { useState } from "react";
import { Link } from "react-router-dom";

import YSvg from "../../../components/svgs/Y";

import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  // make api call to backend to log in user
  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
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
            <h1 className="text-4xl font-extrabold text-white">
              {"Let's"} go.
            </h1>
            <label className="input input-bordered rounded flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                className="grow"
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
                placeholder="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>

            <button className="btn rounded-full btn-primary text-white">
              {isPending ? "Loading..." : "Log in"}
            </button>
            {/* Use react hot toast to handle error message instead. */}
            {/* {isError && <p className="text-red-500">Something went wrong</p>} */}
          </form>

          <div className="divider">or</div>

          <div className="flex flex-col gap-4 mt-2">
            <p className="text-white text-lg">{"Don't"} have an account?</p>
            <Link to="/signup">
              <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
