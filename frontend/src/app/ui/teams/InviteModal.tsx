import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { validateData } from "@/lib/utils";
import { inviteUser } from "@/lib/functions";
import { toast } from "react-toastify";

function InviteModal({
  onClose,
  teamId,
}: {
  onClose: () => void;
  teamId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");

  const [emailErrors, setEmailErrors] = useState<Record<string, string[]>>({
    email: [],
  });

  const [isAdding, setIsAdding] = useState(false);

  const errorsClearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUserInvite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      validateData(["email"], { email }, errorsClearTimeoutRef, setEmailErrors)
    ) {
      //Set Loading
      setIsAdding(true);
      try {
        //Loading
        const invitedUser = await inviteUser(email, teamId);

        toast.success("User has been invited.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
        setModalShow(false);
        setTimeout(() => {
          setIsOpen(false);
          onClose();
        }, 500);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.error) {
            setEmailErrors((prev) => ({
              email: [...prev.email, err.response.data.error],
            }));
          }
        } else {
          alert("Something went wrong");
        }

        //TODO: Implement proper alerts
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
          console.log(err);
        }
      } finally {
        setIsAdding(false);
      }
    }
  };

  useEffect(() => {
    //On Load
    setTimeout(() => {
      setIsOpen(true);

      setTimeout(() => {
        setModalShow(true);
      }, 500);
    }, 100);
  }, []);

  return (
    <div
      className={clsx([
        "fixed top-0 left-0 flex items-center justify-center w-screen h-screen backdrop-blur-sm opacity-0 transition ",
        isOpen && "opacity-100 pointer-events-visible",
        !isOpen && "pointer-events-none",
      ])}
    >
      <div
        className="overlay w-full h-full top-0 left-0 absolute opacity-50 bg-black"
        onClick={closeModal}
      ></div>

      <div
        className={clsx([
          "modal w-96 h-auto shadow-lg bg-white z-index-[9] transition",
          modalShow && "opacity-100 translate-y-0",
          !modalShow && "opacity-0 -translate-y-10",
        ])}
      >
        <div className="flex justify-between p-4 border-b border-gray-100 border-width-1">
          <p className="text-lg font-bold">Invite Users</p>
          <XMarkIcon
            className="text-primary w-8 h-8 cursor-pointer transition"
            onClick={closeModal}
          />
        </div>
        <form className="flex flex-col">
          <div className="py-8 px-4">
            <div className="flex gap-4 w-full items-center">
              <div className="flex flex-col gap-2 w-1/2 flex-1">
                <label htmlFor="firstName">Enter the email of the user</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-gray-300 focus:border-black transition focus:outline-none p-2"
                />
              </div>
              <div className="flex justify-end gap-4 mt-auto">
                <button
                  onClick={handleUserInvite}
                  className="bg-primary shadow-lg transition hover:shadow-xl min-w-[60px] text-white rounded h-fit w-fit p-2 font-semibold cursor-pointer"
                >
                  Invite
                </button>
              </div>
            </div>
            {emailErrors.email.length
              ? emailErrors.email.map((error, index) => (
                  <div
                    key={`email-error-${index}`}
                    className="opacity-0 transition animate-fadeIn text-red-500 text-xs mt-1"
                  >
                    {error}
                  </div>
                ))
              : ""}
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteModal;
