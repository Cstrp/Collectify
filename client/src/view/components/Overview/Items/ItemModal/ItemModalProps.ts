import { Item } from "../../../../../data";

export interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: string;
  item?: Item;
}
