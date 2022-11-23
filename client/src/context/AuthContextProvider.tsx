import React, { useReducer, useState } from "react";
import AuthContext, { IAuthContext } from "./AuthContext";

type Props = {};

const AuthContextProvider = ({ children }: any) => {
  const [username, setUsername] = useState<string>("George");
  const [password, setPassword] = useState<string>("12345");
  const [authToken, setAuthToken] = useState<string>("abcdefg");

  const loginUser = async () => {
    let response = fetch("http://127.0.0.1:8000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: "HR2@email.com", password: "123456" }),
    });

    console.log(response);
  };
  

  const mockAuthContext: IAuthContext = {
    username: username,
    password: password,
    setPassword: setPassword,
    setUsername: setUsername,
    authToken: authToken,
    setAuthToken: setAuthToken,
    ARBITARY_FUNCTION: loginUser
  };

  return (
    <>
      <AuthContext.Provider value={mockAuthContext}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;