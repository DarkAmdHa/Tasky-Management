"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useEffect, useState, useRef, ChangeEvent } from "react";
import { updateProfile, updateProfilePic } from "@/lib/functions";
import axios from "axios";
import { UserObject } from "@/lib/definitions";
import clsx from "clsx";
import Spinner from "../Spinner";
import { validateData } from "@/lib/utils";

function ProfileEdit() {
  const { authObject, setAuthObject } = useContext(AuthContext);
  const user = authObject.user;

  // Initialize the form state with the user's data
  const [form, setForm] = useState<UserObject>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    profession: user.profession,
    avatar_src: user.avatar_src,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Use a ref to store the timeout ID
  const errorsClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({
    email: [],
    phone: [],
    first_name: [],
    last_name: [],
    profession: [],
  });

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [updateEmailBool, setUpdateEmailBool] = useState(false);

  const [addPhone, setAddPhone] = useState(false);
  useEffect(() => {
    // Check if the form data has been modified
    const isFormModified = Object.keys(form).some(
      (key) =>
        form[key as keyof UserObject] !== user[key as keyof UserObject] &&
        key != "email" &&
        key != "phone"
    );
    setIsDataChanged(isFormModified);
  }, [form, user]);

  useEffect(() => {
    // Check if the form data has been modified
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      profession: user.profession,
      avatar_src: user.avatar_src,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user]);

  function resetEmail() {
    // Reset the email field to the user's email
    setForm({ ...form, email: user.email });
    setUpdateEmailBool(false);
  }
  async function handleEmailChange() {
    //Email Update:
    if (validateData(["email"], form, errorsClearTimeoutRef, setFormErrors)) {
      //Set Loading
      setIsLoading(true);

      try {
        //Loading
        const updatedUser = await updateProfile({ email: form.email });
        setAuthObject({
          ...authObject,
          user: updatedUser.user,
        });
        setUpdateEmailBool(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            setFormErrors({
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
      } finally {
        setIsLoading(false);
      }
    }
  }

  function resetPhone() {
    // Reset the email field to the user's email
    setForm({ ...form, phone: "" });
    setAddPhone(false);
  }
  async function handlePhoneChange() {
    //Phone  Update:
    if (validateData(["phone"], form, errorsClearTimeoutRef, setFormErrors)) {
      //Set Loading
      setIsLoading(true);

      try {
        //Loading
        const updatedUser = await updateProfile({ phone: form.phone });
        setAuthObject({
          ...authObject,
          user: updatedUser.user,
        });
        setAddPhone(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            setFormErrors({
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
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // Update the form state when input values change
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormReset() {
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      profession: user.profession || "",
      avatar_src: user.avatar_src || "",
    });
  }

  async function handleSubmit() {
    //Handle Submit
    if (
      validateData(
        ["first_name", "last_name"],
        form,
        errorsClearTimeoutRef,
        setFormErrors
      )
    ) {
      //Set Loading
      setIsLoading(true);

      try {
        let updateObject = {};
        form.first_name != user.first_name
          ? (updateObject = { ...updateObject, first_name: form.first_name })
          : false;
        form.last_name != user.last_name
          ? (updateObject = { ...updateObject, last_name: form.last_name })
          : false;
        form.profession != user.profession
          ? (updateObject = { ...updateObject, profession: form.profession })
          : false;

        if (Object.keys(updateObject).length) {
          //Loading
          const updatedUser = await updateProfile(updateObject);
          setAuthObject({
            ...authObject,
            user: updatedUser.user,
          });
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            setFormErrors({
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
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleProfileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setIsLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profilePic", file);
      try {
        const updatedUser = await updateProfilePic(formData);
        setAuthObject({
          ...authObject,
          user: updatedUser.user,
        });
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            setFormErrors({
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
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <div
      className={clsx("flex flex-col isLoadingDiv", isLoading && "isLoading")}
    >
      {isLoading && <Spinner customClass="customSpinner" />}
      <div className="py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-500">General</h1>
      </div>
      <div className="flex justify-between py-6 border-b border-gray-300">
        <p className="text-xl text-black mt-5">Details</p>
        <div className="rounded-lg bg-tertiary shadow-lg w-8/12">
          <div className="p-4 flex gap-6 items-center border-b border-gray-300">
            <img
              src={
                user.avatar_src
                  ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${user.avatar_src}`
                  : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/img/avatar.jpg`
              }
              width={50}
              height={50}
              className="rounded-full overflow-hidden cursor-pointer"
              alt={`${user.first_name}'s Avatar`}
            />
            <input
              type="file"
              id="profilePic"
              hidden
              name="profilePic"
              onChange={handleProfileUpload}
            />
            <label
              htmlFor="profilePic"
              className="bg-primary cursor-pointer shadow-lg transition hover:shadow-xl text-white rounded h-fit w-fit p-2 font-semibold"
            >
              Upload Image
            </label>
          </div>
          <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
            <div className="flex gap-4 w-full py-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />

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
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />
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
            </div>
            <p className="text-gray-500 text-sm text-left">
              Use your first and last name as they appear on your
              government-issued ID.
            </p>
          </div>
          <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
            <div className="flex gap-4 w-full py-4 items-center">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="firstName">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!updateEmailBool}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />
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
              <div className="flex gap-2 text-primary mt-7">
                <CheckBadgeIcon width={25} />
                <p>Verified</p>
              </div>

              {!updateEmailBool ? (
                <p
                  className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5"
                  onClick={(e) => setUpdateEmailBool(true)}
                >
                  Update
                </p>
              ) : (
                <div className="flex justify-end gap-4 mt-7">
                  <button
                    onClick={resetEmail}
                    className="border border-gray-500 cursor-pointer text-gray-800 min-w-[60px] rounded h-fit w-fit p-2 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEmailChange}
                    className="bg-primary shadow-lg transition hover:shadow-xl min-w-[60px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
            <div className="flex gap-4 w-full py-4 items-center">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="phone">Phone Number (optional)</label>
                <input
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!addPhone}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2 opacity-75"
                />
                {formErrors.phone.length
                  ? formErrors.phone.map((error, index) => (
                      <div
                        key={`phone-error-${index}`}
                        className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                      >
                        {error}
                      </div>
                    ))
                  : ""}
              </div>

              {addPhone ? (
                <div className="flex justify-end gap-4 mt-7 ml-auto">
                  <button
                    onClick={resetPhone}
                    className="border border-gray-500 cursor-pointer text-gray-800 min-w-[60px] rounded h-fit w-fit p-2 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePhoneChange}
                    className="bg-primary shadow-lg transition hover:shadow-xl min-w-[60px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5"
                  onClick={(e) => setAddPhone(true)}
                >
                  Add
                </p>
              )}
            </div>
          </div>
          <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
            <div className="flex gap-4 w-full py-4 items-center">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="phone">Profession (optional)</label>
                <input
                  type="text"
                  placeholder="Profession"
                  name="profession"
                  onChange={handleChange}
                  value={form.profession}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />
                {formErrors.profession.length
                  ? formErrors.profession.map((error, index) => (
                      <div
                        key={`profession-error-${index}`}
                        className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                      >
                        {error}
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl text-black mt-5">Teams</p>
        <div className="rounded-lg bg-tertiary shadow-lg w-8/12">
          <div className="p-4">
            {user.teams &&
              user.teams.map((team) => (
                <div
                  className="flex p-4 border-gray-200 border-b"
                  key={team.id}
                >
                  <Link href={`/dashboard/team/${team.id}`}>{team.name}</Link>
                  <p className="text-red-500 hover:underline cursor-pointer mr-5 ml-auto">
                    Leave Team
                  </p>
                </div>
              ))}
            <p className="text-primary hover:underline cursor-pointer ml-auto mr-5  p-4">
              View All Teams
            </p>
          </div>
        </div>
      </div>

      {isDataChanged && (
        <div className="flex justify-end gap-4">
          <button
            onClick={handleFormReset}
            className="border border-gray-500 cursor-pointer text-gray-800 min-w-[100px] rounded h-fit w-fit p-2 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary shadow-lg transition hover:shadow-xl min-w-[100px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
