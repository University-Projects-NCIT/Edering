import { writable } from 'svelte/store';

const initialCartState = {
  itemQty: 0,
  cartLineItems: [],
};

const createCartStore = () => {
  const { update, set, subscribe } = writable(initialCartState);

  return {
    set,
    subscribe,
    incrementQty: () => {
      update(store => ({
        ...store,
        itemQty: store.itemQty + 1,
      }));
    },
    decrementQty: () => {
      update(store => ({
        ...store,
        itemQty: store.itemQty - 1,
      }));
    },
  };
};

export const cartStore = createCartStore();
