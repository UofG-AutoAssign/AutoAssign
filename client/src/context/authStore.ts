// @Todo Integrate MobX into our state management later
import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data

type tokenType = {
  status: boolean;
  user_type: string;
  token: string;
};

type returnType = {
  data: { first_name: string; second_name: string; email: string };
};

type postType = {
  first_name: string;
  second_name: string;
  email: string;
  role: string;
  password: string;
};
class AuthStore {
  username: string = "George";
  userType: string = "";
  password: string = "123456";
  authToken: string | null = localStorage.getItem("authToken");

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(newUsername: string) {
    this.username = newUsername;
  }

  setPassword(newPassword: string) {
    this.username = newPassword;
  }

  setAuthToken(newToken: string) {
    this.authToken = newToken;
  }

  setUserType(newUserType: string) {
    this.userType = newUserType;
  }

  // @Todo Use Axios Interceptor https://youtu.be/QQYeipc_cik https://youtu.be/2k8NleFjG7I
  async loginUser() {
    const requestBody = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Hr@email.com",
        password:
          "$2a$10$qwIq0tCUBoPtsad19vfZd.ISDFopI5F4RqVUUDSpNsbKwFMC6wnBS",
      }),
      // body: JSON.stringify({ username: "Grad@email.com", password: "123456" }),
      // body: JSON.stringify({ username: "Man@email.com", password: "123456" }),
    };

    await fetch("http://101.200.41.196:8000/", requestBody).then((response) => {
      console.log(
        response.json().then((data: tokenType) => {
          this.setAuthToken(data.token);
          this.setUserType(data.user_type);
          console.log(data);
          localStorage.setItem("authToken", data.token);
        })
      );
    });
  }

  async getUserInfo() {
    const requestBody = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.authToken}`,
      },
    };

    // @Todo Use Axios Interceptor
    await fetch("http://101.200.41.196:8000/home/hr", requestBody).then(
      (response) => {
        response.json().then((data: returnType) => {
          const d = data.data;
          console.log(d);
          this.setUsername(d.first_name + d.second_name);
        });
      }
    );
  }

  async createAccount() {
    const postObject: postType = {
      first_name: "New",
      second_name: "Two",
      email: "Grad5@email.com",
      role: "1",
      password: "123456",
    };

    const requestBody = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.authToken}`,
      },
      body: JSON.stringify(postObject),
    };

    // @Todo Use Axios Interceptor
    let response = await fetch("http://101.200.41.196:8000/home/hr/creat", requestBody);
    let data = await response.json();
    console.log(data)

  }
}

const authStore = new AuthStore();
export default authStore;
