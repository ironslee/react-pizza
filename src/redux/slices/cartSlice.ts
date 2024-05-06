import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";


export type TCartItem = {
  id: string;
  count: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
}

// type CartSliceState = {
//   totalPrice: number,
//   items: TCartItem[],
// }

export interface ICartSliceState {
  totalPrice: number,
  items: TCartItem[],
}

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },

    // addItem(state, action) {
    //   const findItem = state.items.find((obj) => obj.id === action.payload.id);

    //   if (findItem) {
    //     findItem.count++;
    //   } else {
    //     state.items.push({
    //       ...action.payload,
    //       count: 1,
    //     });
    //   }

    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // minusItem(state, action) {
    //   const findItem = state.items.find((obj) => obj.id === action.payload);
    //   if (findItem) {
    //     if (findItem.count > 1) {
    //       findItem.count--;
    //     } else {
    //       state.items = state.items.filter((obj) => obj.id !== action.payload);
    //     }
    //   }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // removeItem(state, action) {
    //   state.items = state.items.filter((obj) => obj.id !== action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // addItem(state, action) {
    //   const findItem = state.items.find(
    //     (obj) =>
    //       obj.id === action.payload.id &&
    //       obj.size === action.payload.size &&
    //       obj.type === action.payload.type
    //   );

    //   if (findItem) {
    //     findItem.count++;
    //   } else {
    //     state.items.push({
    //       ...action.payload,
    //       count: 1,
    //     });
    //   }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      findItem
        ? findItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          });
      state.totalPrice = calcTotalPrice(state.items);
      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.price * obj.count + sum;
      // }, 0);
    },

    // minusItem(state, action) {
    //   const findItem = state.items.find((obj) => {
    //     return (
    //       obj.id === action.payload.id &&
    //       obj.size === action.payload.size &&
    //       obj.type === action.payload.type
    //     );
    //   });
    // if (findItem) {
    //   if (findItem.count > 1) {
    //     findItem.count--;
    //   } else {
    //     state.items = state.items.filter((obj) => {
    //       return (
    //         obj.id !== action.payload.id &&
    //         obj.size !== action.payload.size &&
    //         obj.type !== action.payload.type
    //       );
    //     });
    //   }
    // }
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // minusItem(state, action) {
    //   const findItem = state.items.find((obj) => {
    //     return (
    //       obj.id === action.payload.id &&
    //       obj.size === action.payload.size &&
    //       obj.type === action.payload.type
    //     );
    //   });
    // findItem > 1
    //   ? findItem && findItem.count--
    //   : (state.items = state.items.filter((obj) => {
    //       return (
    //         obj.id !== action.payload.id ||
    //         obj.size !== action.payload.size ||
    //         obj.type !== action.payload.type
    //       );
    //     }));
    //   state.totalPrice -= findItem.price;
    // },

    minusItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      if (findItem) {
        if (findItem.count > 1) {
          findItem.count -= 1;
        } else {
          state.items = state.items.filter((obj) => {
            return (
              obj.id !== action.payload.id ||
              obj.size !== action.payload.size ||
              obj.type !== action.payload.type
            );
          });
        }
        state.totalPrice = calcTotalPrice(state.items);
        // state.totalPrice = state.items.reduce((sum, obj) => {
        //   return obj.price * obj.count + sum;
        // }, 0);
      }

      // const filteredItems = state.items.reduce((acc, item) => {
      //   if (
      //     item.id === action.payload.id &&
      //     item.type === action.payload.type &&
      //     item.size === action.payload.size
      //   ) {
      //     item.count--;
      //     return acc;
      //   } else {
      //     acc.push(item);
      //   }

      //   return acc;
      // }, []);

      // state.items = filteredItems;

      // if (findItem) {
      //   findItem.count -= 1;
      //   state.totalPrice -= findItem.price;
      // }
    },

    // removeItem(state, action) {
    //   state.items = state.items.filter((obj) => {
    //     return (
    //       obj.id !== action.payload.id ||
    //       obj.size !== action.payload.size ||
    //       obj.type !== action.payload.type
    //     );
    //   });
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },

    // removeItem(state, action) {
    //   const findItem = state.items.find((obj) => {
    //     return (
    //       obj.id === action.payload.id &&
    //       obj.size === action.payload.size &&
    //       obj.type === action.payload.type
    //     );
    //   });
    // state.items = state.items.filter((obj) => {
    //   return (
    //     obj.id !== action.payload.id ||
    //     obj.size !== action.payload.size ||
    //     obj.type !== action.payload.type
    //   );
    // });
    //   state.totalPrice -= findItem.price * findItem.count;
    // },

    removeItem: (state, action: PayloadAction<TCartItem>) => {
      state.items = state.items.reduce((acc: TCartItem[], item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type
        ) {
          state.totalPrice -= item.price * item.count;

          return acc;
        } else {
          acc.push(item);
        }

        return acc;
      }, []);
    },

    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string, typeNames: string[], sizes: number[]) => (state: RootState) =>
  state.cart.items.find(
    (obj, index) =>
      obj.id === id &&
      obj.type === typeNames[index] &&
      obj.size === sizes[index]
  );

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
