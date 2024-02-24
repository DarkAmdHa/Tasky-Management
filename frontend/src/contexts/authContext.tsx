"use client";
import { createContext, useState, useEffect } from "react";
import { AuthObject, UserObject } from "@/lib/definitions";
import { getPendingInvites, getUser } from "@/lib/functions";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  authObject: AuthObject;
  setAuthObject: React.Dispatch<React.SetStateAction<AuthObject>>;
};

const defaultAuthObject: AuthObject = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    profession: "",
    phone: "",
    avatar_src: "",
  },
  pendingInvites: [],
  isLoading: false,
  isAuthenticating: false,
  isSuccess: false,
  isError: false,
  errorMessage: {},
};

export const AuthContext = createContext<AuthContextType>({
  authObject: defaultAuthObject,
  setAuthObject: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [authObject, setAuthObject] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      profession: "",
      phone: "",
      avatar_src: "",
    },
  pendingInvites: [],

    isLoading: true,
    isAuthenticating: false,
    isSuccess: false,
    isError: false,
    errorMessage: {},
  });

  // Check if user already authenticated
  useEffect(() => {
    const getUserAsync = async () => {
      try {
        const user = await getUser();
        if (user) {
          const pendingInvites = await getPendingInvites();
          setAuthObject({ ...authObject, user,pendingInvites, isLoading: false });
        } else {
          setAuthObject({ ...authObject, isLoading: false });
          if (pathname.startsWith("/dashboard")) {
            router.push("/");
          }
        }
      } catch (e) {
        //TODO: Implement Alert
        router.push("/");
      }
    };
    getUserAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ authObject, setAuthObject }}>
      {children}
    </AuthContext.Provider>
  );
}
