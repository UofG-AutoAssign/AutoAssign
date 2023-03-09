import { makeAutoObservable } from "mobx";

// Add dark theme to sessionStorage later
class ThemeStore {
  isDarkMode: boolean = false;

  constructor() {
    makeAutoObservable(this);

    const storedTheme = sessionStorage.getItem("isDarkMode");
    if (storedTheme !== null) {
      this.isDarkMode = storedTheme === "true" ? true : false;
    }
  }

  switchThemes(): void {
    this.isDarkMode = !this.isDarkMode;
    sessionStorage.setItem("isDarkMode", this.isDarkMode === true ? "true" : "false");
  }
}

const themeStore = new ThemeStore();
export default themeStore;
