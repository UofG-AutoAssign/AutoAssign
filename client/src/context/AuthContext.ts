import { createContext, useContext } from "react";

export interface IAuthContext {
  username: string;
  userType: string;
  password: string;
  setUsername: (name: string) => void
  setPassword: (pwd: string) => void
  authToken: string | null;
  setAuthToken: (newToken: string) => void
  loginUser: () => Promise<void>
  getUserInfo: () => Promise<void>
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
