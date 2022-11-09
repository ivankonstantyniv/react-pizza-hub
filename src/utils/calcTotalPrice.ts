import { ItemType } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: ItemType[]) => {
  return items.reduce((counter, obj) => {
    return obj.count * obj.price + counter;
  }, 0);
}