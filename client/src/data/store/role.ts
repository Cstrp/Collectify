import { makeAutoObservable } from "mobx";
import { ROLE } from "../types";

class Role {
  public role!: ROLE;

  constructor() {
    makeAutoObservable(this);
  }

  public setRole(role: ROLE) {
    this.role = role;
  }

  public isUser(): boolean {
    return this.role === ROLE.USER;
  }

  public isAdmin(): boolean {
    return this.role === ROLE.ADMIN;
  }
}

const roleStore = new Role();

export { roleStore };
