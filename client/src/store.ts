import { makeAutoObservable } from "mobx"; // Add this to where we centralize our data

class Store {
  state: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  your_function() {}
}

const store = new Store();
export default store;