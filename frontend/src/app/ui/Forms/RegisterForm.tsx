"use client";
import { useState, useRef } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Spinner from "@/app/ui/Spinner";

function RegisterForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const initialErrorState: Record<string, string[]> = {
    email: [],
    password: [],
    first_name: [],
    last_name: [],
  };

  // Use a ref to store the timeout ID
  const errorsClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [isSaving, setIsSaving] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const validateData = () => {
    let errors: Record<string, string[]> = {
      email: [],
      password: [],
      first_name: [],
      last_name: [],
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

    if (form.first_name === "")
      errors.first_name.push("First Name is required");
    if (form.last_name === "") errors.last_name.push("Last Name is required");

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

  const handleRegister = async () => {
    if (isSaving) return false;
    if (validateData()) {
      setIsSaving(true);
      try {
        register({ setFormErrors, initialErrorState, form });
      } catch (e: any) {
        //TODO: Implement proper alerts
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
          console.log(e);
        }
        alert("Something went wrong.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold pb-6 text-center">Register</h1>
        <div className="mb-2">
          <label htmlFor="first_name" className="text-gray-700 font-medium">
            First Name
          </label>
          <div className="flex gap-2 border-b border-gray-200  px-2">
            <UserIcon width={15} className="text-gray-500" />
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full focus:outline-none px-2"
            />
          </div>
          {formErrors.first_name.length
            ? formErrors.first_name.map((error, index) => (
                <div
                  key={`first_name-error-${index}`}
                  className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                >
                  {error}
                </div>
              ))
            : ""}
        </div>
        <div className="mb-2">
          <label htmlFor="last_name" className="text-gray-700 font-medium">
            Last Name
          </label>
          <div className="flex gap-2 border-b border-gray-200  px-2">
            <UserIcon width={15} className="text-gray-500" />
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="min-h-[40px] w-full focus:outline-none px-2"
            />
          </div>
          {formErrors.last_name.length
            ? formErrors.last_name.map((error, index) => (
                <div
                  key={`last_name-error-${index}`}
                  className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                >
                  {error}
                </div>
              ))
            : ""}
        </div>

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

        <button
          onClick={handleRegister}
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-primary to-primaryDarker transition hover:shadow-xl text-white p-3 rounded-3xl mt-6 flex items-center justify-center"
        >
          {isSaving ? (
            <Spinner />
          ) : (
            <p className="min-h-[30px] flex items-center">Register</p>
          )}
        </button>

        <p className="text-sm flex gap-2 justify-center mt-2 text-center ">
          Already have an account?
          <Link className="text-primary hover:underline" href="/login">
            Login
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

export default RegisterForm;
