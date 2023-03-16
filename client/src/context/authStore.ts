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
  username = "";
  userType = "";
  authToken = "";

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
      console.log(data);

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

}

const authStore = new AuthStore();
export default authStore;
