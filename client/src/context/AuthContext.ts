import { createContext, useContext } from "react";

export interface IAuthContext {
  username: string;
  password: string;
  setUsername: (name: string) => void
  setPassword: (pwd: string) => void
  authToken: string;
  setAuthToken: (newToken: string) => void
  ARBITARY_FUNCTION: any
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
