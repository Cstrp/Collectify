import { makeAutoObservable } from "mobx";
import { getLs, setLs } from "../utils";

class ThemeStore {
  public theme: string = getLs("theme") || "dark";

  constructor() {
    makeAutoObservable(this);
  }

  changeTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    setLs("theme", this.theme);
  }
}

const themeStore = new ThemeStore();

export { themeStore };
