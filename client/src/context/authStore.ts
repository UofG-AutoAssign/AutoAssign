// @Todo Integrate MobX into our state management later

import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data
class AuthStore {
  username!: string;
  userType!: string;
  password!: string;
  setUsername!: (name: string) => void;
  setPassword!: (pwd: string) => void;
  authToken!: string | null;
  setAuthToken!: (newToken: string) => void;
  loginUser!: () => Promise<void>;
  getUserInfo!: () => Promise<void>;

  constructor() {
    makeAutoObservable(this);
  }

  your_function() {}
}

const authStore = new AuthStore();
export default authStore;