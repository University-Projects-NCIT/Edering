import { writable } from 'svelte/store';
import type { IMenu } from 'types';

export interface ICartItem {
  id?: string;
  name?: string;
  price?: string;
  quantity?: number;
}

interface IInitialCartState {
  cartItems: ICartItem[];
}

const initialCartState: IInitialCartState = {
  cartItems: [],
};

const createCartStore = () => {
  const { update, set, subscribe } = writable(initialCartState);

  return {
    set,
    subscribe,
    addToCart: (state: IInitialCartState, item: ICartItem) => {
      console.log('state', state);
      let updatedCartItems: ICartItem[] = [];

      if (state.cartItems.length === 0) updatedCartItems = [item];

      if (state.cartItems.length > 0) {
        state.cartItems.forEach((currItem, i) => {
          if (currItem.id === item.id) {
            updatedCartItems = [...state.cartItems];
            updatedCartItems[i] = {
              ...currItem,
              quantity: item.quantity,
            };
          } else {
            updatedCartItems = [...state.cartItems, item];
          }
        });
      }

      console.log('updated', updatedCartItems);
      update(store => ({
        ...store,
        cartItems: [...updatedCartItems],
      }));
    },

    removeFromCart: (state: IInitialCartState, item: ICartItem) => {
      let updatedCartItems: ICartItem[] = [];

      state.cartItems.forEach((currItem, i) => {
        if (currItem.id === item.id) {
          updatedCartItems = [...state.cartItems];
          item.quantity
            ? (updatedCartItems[i] = {
                ...currItem,
                quantity: item.quantity,
              })
            : updatedCartItems.splice(i, 1);
        }
      });

      update(store => ({
        ...store,
        cartItems: [...updatedCartItems],
      }));
    },
  };
};

export const cartStore = createCartStore();
