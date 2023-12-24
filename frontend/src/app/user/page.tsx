import SideNav from "@/app/ui/dashboard/SideNav";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
function page() {
  const user = {
    firstName: "Hamid",
    lastName: "Hamid",
    email: "hamidtahir2000@gmail.com",
    imgSrc: "/",
    emailVerified: "",
    profession: "Front-end Developer",
    phone: "",
    teams: [
      {
        id: 1,
        name: "Refresh Digital",
      },
      {
        id: 2,
        name: "AOE",
      },
    ],
  };
  return (
    <div className="flex min-h-screen m-auto">
      <SideNav />
      <div className="w-full">
        <div className="p-7 gap-5 flex flex-col">
          <div className="px-6 py-8 rounded-lg bg-white shadow-lg">
            <div className="max-w-4xl m-auto">
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
                        alt={`${user.firstName}'s Avatar`}
                      />

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
                            value={user.firstName}
                            className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={user.lastName}
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
                            value={user.email}
                            disabled
                            className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                          />
                        </div>
                        <div className="flex gap-2 text-primary mt-7">
                          <CheckBadgeIcon width={25} />
                          <p>Verified</p>
                        </div>
                        <p className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5">
                          Update
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
                      <div className="flex gap-4 w-full py-4 items-center">
                        <div className="flex flex-col gap-2 w-1/2">
                          <label htmlFor="phone">Phone Number (optional)</label>
                          {user.phone ? (
                            <input
                              type="number"
                              placeholder="Email"
                              value={user.email}
                              disabled
                              className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2 opacity-75"
                            />
                          ) : (
                            <p>No phone number</p>
                          )}
                        </div>

                        <p className="text-primary hover:underline cursor-pointer mt-7 ml-auto mr-5">
                          Add
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center border-b border-gray-300 w-full flex-col">
                      <div className="flex gap-4 w-full py-4 items-center">
                        <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="phone">Profession (optional)</label>
                          {user.profession ? (
                            <input
                              type="text"
                              placeholder="Profession"
                              value={user.profession}
                              className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                            />
                          ) : (
                            <p>No phone number</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between py-4">
                  <p className="text-xl text-black mt-5">Teams</p>
                  <div className="rounded-lg bg-tertiary shadow-lg w-8/12">
                    <div className="p-4">
                      {user.teams.map((team) => (
                        <div
                          className="flex p-4 border-gray-200 border-b"
                          key={team.id}
                        >
                          <Link href={`/dashboard/team/${team.id}`}>
                            {team.name}
                          </Link>
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

                <div className="flex justify-end gap-4">
                  <button className="border border-gray-500 cursor-pointer text-gray-800 min-w-[100px] rounded h-fit w-fit p-2 font-semibold">
                    Cancel
                  </button>
                  <button className="bg-primary shadow-lg transition hover:shadow-xl min-w-[100px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
