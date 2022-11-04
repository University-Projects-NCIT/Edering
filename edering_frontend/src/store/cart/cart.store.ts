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
        cartItems: removeItem(store, item),
      }));
    },
  };
};

const removeItem = (store: IInitialCartState, item: IMenu) => {
  const newCartItems = [...store.cartItems];
  console.log('removeitem', store);

  const cartItemPosition = newCartItems.findIndex(({ id }) => item.id === id);
  newCartItems.splice(cartItemPosition, 1);
  console.log(newCartItems);
  return newCartItems;
};

export const cartStore = createCartStore();
