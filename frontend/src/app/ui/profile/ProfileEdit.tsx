"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useEffect, useState } from "react";

function ProfileEdit() {
  const { authObject } = useContext(AuthContext);
  const user = authObject.user;

  const [initialState, setInitialState] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone || "",
    profession: user.profession || "",
  });

  const [form, setForm] = useState(initialState);

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePhone, setUpdatePhone] = useState(false);

  useEffect(() => {
    const isFormModified = Object.keys(form).some(
      (key) => form[key] !== initialState[key]
    );
    setIsDataChanged(isFormModified);
  }, [form, initialState]);

  function resetInput(inputName: "email" | "phone") {
    setForm({ ...form, [inputName]: user[inputName] || "" });
    const setFunctionsArray = {
      email: setUpdateEmail(false),
      phone: setUpdatePhone(false),
    };
    setFunctionsArray[inputName];
  }

  function resetAll() {
    setForm(initialState);
  }

  function handleEmailChange() {
    //Change email or  handle errors
  }
  function handlePhoneChange() {
    //Change email or  handle errors
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col">
      <div className="py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-500">General</h1>
      </div>
      <div className="flex justify-between py-6 border-b border-gray-300">
        <p className="text-xl text-black mt-5">Details</p>
        <div className="rounded-lg bg-tertiary shadow-lg w-8/12">
          <div className="p-4 flex gap-6 items-center border-b border-gray-300">
            <Image
              src="https://picsum.photos/100"
              width={50}
              height={50}
              className="rounded-full overflow-hidden cursor-pointer"
              alt={`${user.first_name}'s Avatar`}
            />
            <input type="file" hidden={true} />
            <button className="bg-primary shadow-lg transition hover:shadow-xl text-white rounded h-fit w-fit p-2 font-semibold">
              Upload Image
            </button>
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
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!updateEmail}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />
              </div>
              <div className="flex gap-2 text-primary mt-7">
                <CheckBadgeIcon width={25} />
                <p>Verified</p>
              </div>

              {!updateEmail ? (
                <p
                  className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5"
                  onClick={(e) => setUpdateEmail(true)}
                >
                  Update
                </p>
              ) : (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={(e) => resetInput("email")}
                    className="border border-gray-500 cursor-pointer text-gray-800 min-w-[100px] rounded h-fit w-fit p-2 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEmailChange}
                    className="bg-primary shadow-lg transition hover:shadow-xl min-w-[100px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
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
                  disabled={!updatePhone}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2 opacity-75"
                />
              </div>

              {!updatePhone ? (
                <p
                  className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5"
                  onClick={(e) => setUpdatePhone(true)}
                >
                  {user.phone ? "Update" : "Add"}
                </p>
              ) : (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={(e) => resetInput("phone")}
                    className="border border-gray-500 cursor-pointer text-gray-800 min-w-[100px] rounded h-fit w-fit p-2 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePhoneChange}
                    className="bg-primary shadow-lg transition hover:shadow-xl min-w-[100px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl text-black mt-5">Teams</p>
        <div className="rounded-lg bg-tertiary shadow-lg w-8/12">
          <div className="p-4">
            {user.teams?.length ? (
              <>
                {user.teams.map((team) => (
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
              </>
            ) : (
              <p>You are not part of any teams</p>
            )}
          </div>
        </div>
      </div>

      {isDataChanged && (
        <div className="flex justify-end gap-4">
          <button
            onClick={resetAll}
            className="border border-gray-500 cursor-pointer text-gray-800 min-w-[100px] rounded h-fit w-fit p-2 font-semibold"
          >
            Cancel
          </button>
          <button className="bg-primary shadow-lg transition hover:shadow-xl min-w-[100px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
