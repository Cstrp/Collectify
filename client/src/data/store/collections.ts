import { makeAutoObservable } from "mobx";
import { Collection } from "../types";

class CollectionsStore {
  public collections: Collection[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setCollection(collections: Collection[]) {
    this.collections = collections;
  }

  public addCollection(collection: Collection): void {
    this.collections = [...this.collections, collection];
  }

  public updateCollection(
    collectionId: string,
    updatedCollection: Collection
  ): void {
    this.collections = this.collections.map(collection => {
      if (collection._id === collectionId) {
        return { _id: collectionId, ...updatedCollection };
      }

      return collection;
    });
  }

  public removeCollection(collectionId: string): void {
    this.collections = this.collections.filter(
      collection => collection._id !== collectionId
    );
  }
}

const collectionStore = new CollectionsStore();

export { collectionStore };
