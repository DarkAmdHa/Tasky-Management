"use client";

import { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Spinner from "@/app/ui/Spinner";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    setIsSaving(true);
  };
  const [isSaving, setIsSaving] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold pb-6 text-center">Login</h1>
        <div className="mb-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <div className="flex gap-2 border-b border-gray-200  px-2">
            <UserIcon width={15} className="text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full focus:outline-none px-2"
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <div className="flex gap-2 border-b border-gray-200 px-2">
            <LockClosedIcon width={15} className="text-gray-500" />
            <input
              type={hidePassword ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full focus:outline-none px-2"
            />
            {hidePassword ? (
              <EyeSlashIcon
                width={15}
                className="text-gray-500 cursor-pointer"
                onClick={() => setHidePassword((prev) => !prev)}
              />
            ) : (
              <EyeIcon
                width={15}
                className="text-gray-500 cursor-pointer"
                onClick={() => setHidePassword((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end text-gray-500 text-sm">
          <p className="cursor-pointer hover:underline">Forgot Password?</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-primary to-primaryDarker transition hover:shadow-xl text-white p-3 rounded-3xl mt-6 flex items-center justify-center"
        >
          {isSaving ? (
            <Spinner />
          ) : (
            <p className="min-h-[30px] flex items-center">Login</p>
          )}
        </button>

        <p className="text-sm flex gap-2 justify-center mt-2 text-center ">
          Don&apos;t have an account?
          <Link className="text-primary hover:underline" href="/register">
            Signup
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <div className="bg-gray-200 h-[1px] w-full"></div>
        OR
        <div className="bg-gray-200 h-[1px] w-full"></div>
      </div>

      <div className="flex items-center justify-center flex-col gap-4">
        <button className="w-full p-2 rounded-3xl text-center border border-gray-500 font-medium transition hover:shadow-lg">
          Login using Google
        </button>
        <button className="w-full p-2 rounded-3xl text-center bg-blue-400 text-white font-medium transition hover:shadow-lg">
          Login using Facebook
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
