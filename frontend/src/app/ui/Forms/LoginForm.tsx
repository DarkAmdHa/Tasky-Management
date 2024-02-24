"use client";

import { useState, useRef, useContext, useEffect } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Spinner from "@/app/ui/Spinner";

import { loginUser } from "@/lib/functions";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import clsx from "clsx";

function LoginForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isEmailFormDisabled, setIsEmailFormDisabled] = useState(false);

  const initialErrorState: Record<string, string[]> = {
    email: [],
    password: [],
  };

  const { authObject, setAuthObject } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authObject.user["email"]) {
      router.push("/dashboard");
    }
  }, [authObject]);

  //Check if user in url, in which case set a disabled user field (since it's by invite)
  useEffect(() => {
    const userByInvite = searchParams.get("user");
    if (userByInvite && userByInvite != "") {
      setForm((prev) => ({ ...prev, email: userByInvite }));
      setIsEmailFormDisabled(true);
    }
  }, [searchParams]);

  // Use a ref to store the timeout ID
  const errorsClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [formErrors, setFormErrors] = useState(initialErrorState);

  const validateData = () => {
    let errors: Record<string, string[]> = {
      email: [],
      password: [],
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const parts = form.email.split("@");
    const domainParts = parts[1]?.split(".");

    if (
      !form.email.includes("@") ||
      parts.length !== 2 ||
      domainParts.length < 2 ||
      domainParts.some((part) => part === "") ||
      !emailRegex.test(form.email)
    ) {
      errors.email.push("Please provide a valid email");
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      errors.password.push(
        "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one symbol."
      );
    }

    //If errors found
    if (Object.keys(errors).find((key: string) => errors[key].length > 0)) {
      // Clear previous timeout
      if (errorsClearTimeoutRef.current) {
        clearTimeout(errorsClearTimeoutRef.current);
      }
      setFormErrors(errors);
      errorsClearTimeoutRef.current = setTimeout(() => {
        setFormErrors(initialErrorState);
      }, 5000);
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (authObject.isLoading || authObject.isAuthenticating) return false;
    if (validateData()) {
      //Set Loading
      setAuthObject({ ...authObject, isAuthenticating: true });

      try {
        //Loading
        const data = await loginUser(form);
        setAuthObject({
          ...authObject,
          isLoading: false,
          isAuthenticating: false,
          user: data.user,
          pendingInvites: data["pendingInvites"] || [],
          isSuccess: true,
        });
      } catch (err: unknown) {
        setAuthObject({
          ...authObject,
          isLoading: false,
          isAuthenticating: false,
          isSuccess: false,
          isError: true,
        });
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            setFormErrors({
              ...initialErrorState,
              ...err.response.data.errors,
            });
          }
        } else {
          alert("Something went wrong");
        }

        //TODO: Implement proper alerts
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
          console.log(err);
        }
      }
    }
  };
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold pb-6 text-center">Login</h1>
        <div className="mb-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <div
            className={clsx([
              "flex gap-2 border-b border-gray-200  px-2",
              isEmailFormDisabled && "opacity-50   bg-slate-300",
            ])}
          >
            <UserIcon width={15} className="text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              value={form.email}
              className="min-h-[40px] w-full focus:outline-none px-2"
              disabled={isEmailFormDisabled}
            />
          </div>
          {formErrors.email.length
            ? formErrors.email.map((error, index) => (
                <div
                  key={`email-error-${index}`}
                  className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                >
                  {error}
                </div>
              ))
            : ""}
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
              value={form.password}
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
          {formErrors.password.length
            ? formErrors.password.map((error, index) => (
                <div
                  key={`password-error-${index}`}
                  className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                >
                  {error}
                </div>
              ))
            : ""}
        </div>
        <div className="flex justify-end text-gray-500 text-sm">
          <p className="cursor-pointer hover:underline">Forgot Password?</p>
        </div>

        <button
          onClick={handleLogin}
          disabled={authObject.isAuthenticating}
          className="w-full bg-gradient-to-r from-primary to-primaryDarker transition hover:shadow-xl text-white p-3 rounded-3xl mt-6 flex items-center justify-center"
        >
          {authObject.isAuthenticating ? (
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
