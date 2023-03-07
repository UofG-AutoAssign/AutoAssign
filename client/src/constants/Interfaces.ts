import { initialComponentHR } from "./Types";

export interface LandingButtonLinkProps {
  title: string;
  desc: string;
  btn_color: string;
  link: string | null;
  initialState: initialComponentHR;
}

export interface ManagerTableInterface {
  name: string;
  email: string;
}

export interface ItemInterface {
  value: number;
  label: string;
}