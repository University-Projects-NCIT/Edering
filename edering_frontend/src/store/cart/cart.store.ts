import { writable } from 'svelte/store';

export interface ICartItem {
  id?: string;
  name?: string;
  price?: string;
  quantity?: number;
  total?: number;
}

interface IInitialCartState {
  cartItems: ICartItem[];
  isLoading: boolean;
}

const initialCartState: IInitialCartState = {
  cartItems: [],
  isLoading: false,
};

const createCartStore = () => {
  const { update, set, subscribe } = writable(initialCartState);

  return {
    set,
    subscribe,
    addToCart: (state: IInitialCartState, item: ICartItem) => {
      if (state.isLoading) return;

      update(store => ({
        ...store,
        isLoading: true,
      }));

      let updatedCartItems: ICartItem[] = [...state.cartItems];
      let index = updatedCartItems.findIndex(
        currItem => currItem.id === item.id
      );

      if (index >= 0) {
        updatedCartItems[index] = item;
      } else {
        updatedCartItems = [...updatedCartItems, item];
      }

      update(store => ({
        ...store,
        isLoading: false,
        cartItems: [...updatedCartItems],
      }));
    },

    removeFromCart: (state: IInitialCartState, item: ICartItem) => {
      if (state.isLoading) return;
      update(store => ({
        ...store,
        isLoading: true,
      }));
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
        isLoading: false,
        cartItems: [...updatedCartItems],
      }));
    },
  };
};

export const cartStore = createCartStore();
