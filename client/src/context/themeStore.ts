import { makeAutoObservable } from "mobx";

// Add dark theme to localStorage later
class ThemeStore {
  isDarkMode: boolean = false;

  constructor() {
    makeAutoObservable(this);

    const storedTheme = localStorage.getItem("isDarkMode");
    if (storedTheme !== null) {
      this.isDarkMode = storedTheme === "true" ? true : false;
    }
  }

  switchThemes(): void {
    this.isDarkMode = !this.isDarkMode;
    console.log(this.isDarkMode);

    localStorage.setItem("isDarkMode", this.isDarkMode === true ? "true" : "false");
  }
}

const themeStore = new ThemeStore();
export default themeStore;
