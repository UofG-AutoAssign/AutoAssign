import { makeAutoObservable } from "mobx";

// Add dark theme to localStorage later
class ThemeStore {
  isDarkMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  switchThemes(): void {
    this.isDarkMode = !this.isDarkMode;
    console.log(this.isDarkMode);
  }
}

const themeStore = new ThemeStore();
export default themeStore;
