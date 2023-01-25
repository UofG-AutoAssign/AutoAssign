import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data

type themes = "dark" | "light";

class ThemeStore {
  currentTheme: themes = "light";

  constructor() {
    makeAutoObservable(this);
  }

  switchThemes() {
    if (this.currentTheme === "dark") this.currentTheme = "light";
    else this.currentTheme = "dark";
  }
}

const themeStore = new ThemeStore();
export default themeStore;
