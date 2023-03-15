// @Todo Integrate MobX into our state management later
import axios from "axios";
import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data
import { toast } from "react-toastify";
import { environmentalVariables } from "../constants/EnvironmentalVariables";

type tokenType = {
  status: boolean;
  user_type: string;
  token: string;
};

export type returnType = {
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
  username: string = "";
  userType: string = "";
  authToken: string = "";

  constructor() {
    makeAutoObservable(this);

    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername !== null) {
      this.username = storedUsername;
    }

    const storedUserType = sessionStorage.getItem("userType");
    if (storedUserType !== null) {
      this.userType = storedUserType;
    }

    const storedAuthToken = sessionStorage.getItem("authToken");
    if (storedAuthToken !== null) {
      this.authToken = storedAuthToken
    }
  }

  setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  setAuthToken(newToken: string): void {
    this.authToken = newToken;
  }

  setUserType(newUserType: string): void {
    this.userType = newUserType;
  }

  // @Todo Use Axios Interceptor https://youtu.be/QQYeipc_cik https://youtu.be/2k8NleFjG7I
  async loginUser(username: string, password: string): Promise<string> {
    try {
      const response = await axios.post(`${environmentalVariables.backend}`, {
        username,
        password
      });
      
      const data = response.data;

      if (data.status === false) {
        toast.error("Login Failed")
        return "Login Failed";
      }

      // Fixes "manger" typo from API
      const correctedUserType = data.user_type === "Manger" ? "Manager" : data.user_type;
      
      this.setAuthToken(data.token);
      this.setUserType(correctedUserType);
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userType", correctedUserType);

      return correctedUserType;

    } catch (error) {
      console.log(error);
      return "Caught error in login";
    }
  }

  async getUserInfo(): Promise<void> {
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

  async createAccount(): Promise<void> {
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
    let response = await fetch(
      "http://101.200.41.196:8000/home/hr/creat",
      requestBody
    );
    let data = await response.json();
    console.log(data);
  }
}

const authStore = new AuthStore();
export default authStore;
