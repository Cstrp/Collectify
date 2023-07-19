import { makeAutoObservable, reaction } from "mobx";
import { Item as I } from "../types";

class Item {
  public item: I = {} as I;
  public like = false;
  public likeCount = 0;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.item.likes,
      () => this.updateLikes()
    );
  }

  public setItem(item: I) {
    this.item = item;
  }

  public updateLikes() {
    const likeLength = this.item.likes
      ? this.item.likes.filter(like => like.isLiked).length
      : 0;
    this.like = this.item.likes
      ? this.item.likes.some(like => like.isLiked)
      : false;
    this.likeCount = likeLength;
  }
}

const itemStore = new Item();

export { itemStore };
