"use client";

import { createContext, useState, useEffect } from "react";
import { AuthObject, UserObject } from "@/lib/definitions";
import { getUser } from "@/lib/functions";
import { useRouter } from "next/navigation";

type AuthContextType = {
  authObject: AuthObject;
  setAuthObject: React.Dispatch<React.SetStateAction<AuthObject>>;
};

const defaultAuthObject: AuthObject = {
  user: {},
  isLoading: false,
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

  const [authObject, setAuthObject] = useState({
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: {},
  });

  //Check if user already authenticated
  useEffect(() => {
    const getUserAsync = async () => {
      try {
        const user = await getUser();
        if (user) {
          setAuthObject({ ...authObject, user });
        }
      } catch (e) {
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
