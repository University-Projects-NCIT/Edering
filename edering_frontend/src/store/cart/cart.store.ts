import { writable } from 'svelte/store';
import type { IMenu } from 'types';

interface IInitialCartState {
  cartItems: IMenu[];
}

const initialCartState: IInitialCartState = {
  cartItems: [],
};

const createCartStore = () => {
  const { update, set, subscribe } = writable(initialCartState);

  return {
    set,
    subscribe,
    addToCart: (item: IMenu) => {
      update(store => ({
        ...store,
        cartItems: [...store.cartItems, item],
      }));
    },

    removeFromCart: (item: IMenu) => {
      update(store => ({
        ...store,
        cartItems: store.cartItems.filter(({ id }) => id !== item.id) ?? [],
      }));
    },
  };
};

export const cartStore = createCartStore();
