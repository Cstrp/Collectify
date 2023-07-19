import { Collection } from '../../../modules';

export interface CollectionState {
  collections: Collection[];
  collection: Collection | null;
  error?: string | null;
}
