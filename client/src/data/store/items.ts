import { makeAutoObservable } from "mobx";
import { Item } from "../types";

class ItemsStore {
  public items: Item[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setItems(items: Item[]): void {
    this.items = items;
  }

  public addItem(item: Item): void {
    this.items = [...this.items, item];
  }

  public updateItem(itemId: string, updatedItem: Item): void {
    this.items = this.items.map(item => {
      if (item._id === itemId) {
        return { _id: itemId, ...updatedItem };
      }

      return item;
    });
  }

  public removeItem(itemId: string): void {
    this.items = this.items.filter(item => item._id !== itemId);
  }
}

const itemsStore = new ItemsStore();

export { itemsStore };
