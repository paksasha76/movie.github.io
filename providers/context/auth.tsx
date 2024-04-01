import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  login: boolean;
  setLogin: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  login: false,
  setLogin: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [login, setLogin] = useState<boolean>(false);
                                                                                                                                                                                                                                                                               
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth && isAuth === "true") {
      setLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
