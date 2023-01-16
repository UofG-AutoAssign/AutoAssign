import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { IAuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: any) => {
  const [username, setUsername] = useState<string>("George");
  const [password, setPassword] = useState<string>("12345");
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [userType, setUserType] = useState<string>("");

  const loginUser = async () => {
    type tokenType = {
      status: boolean;
      user_type: string;
      token: string;
    };

    // @Todo Use Axios Interceptor https://youtu.be/QQYeipc_cik https://youtu.be/2k8NleFjG7I
    // await fetch("http://127.0.0.1:8000/", {
    await fetch("http://101.200.41.196:8000/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "Hr@email.com", password: "$2a$10$qwIq0tCUBoPtsad19vfZd.ISDFopI5F4RqVUUDSpNsbKwFMC6wnBS" }),
      // body: JSON.stringify({ username: "Grad@email.com", password: "123456" }),
      // body: JSON.stringify({ username: "Man@email.com", password: "123456" }),
    }).then((response) => {
      console.log(
        response.json().then((data: tokenType) => {
          setAuthToken(data.token);
          setUserType(data.user_type);
          console.log(data);
          localStorage.setItem("authToken", data.token);
        })
      );
    });
  };

  const getUserInfo = async () => {
    type returnType = {
      data: { first_name: string; second_name: string; email: string };
    };

    // @Todo Use Axios Interceptor
    // await fetch("http://127.0.0.1:8000/home/hr", {
    await fetch("http://101.200.41.196:8000/home/hr", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
    }).then((response) => {
      response.json().then((data: returnType) => {
        const d = data.data;
        console.log(d);
        setUsername(d.first_name + d.second_name)
      });
    });
  };

  const createAccount = async () => {
    type postType = {
      first_name: string;
      second_name: string;
      email: string;
      role: string;
      password: string;
    };

    const postObject: postType = {
      first_name: "New",
      second_name: "Two",
      email: "Grad5@email.com",
      role: "1",
      password: "123456",
    };

    // @Todo Use Axios Interceptor
    // await fetch("http://127.0.0.1:8000/home/hr/creat", {
    await fetch("http://101.200.41.196:8000/home/hr/creat", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(postObject),
    }).then((response) => {
      console.log(
        response.json().then((data: any) => {
          console.log(data);
        })
      );
    });
  };

  const mockAuthContext: IAuthContext = {
    username: username,
    userType: userType,
    password: password,
    setPassword: setPassword,
    setUsername: setUsername,
    authToken: authToken,
    setAuthToken: setAuthToken,
    loginUser: loginUser,
    getUserInfo: getUserInfo,
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
