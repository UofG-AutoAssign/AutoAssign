import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data

class ThemeStore {
  currentTheme: "dark" | "light" = "light";

  constructor() {
    makeAutoObservable(this);
  }

  your_function() {}
}

const themeStore = new ThemeStore();
export default ThemeStore;
