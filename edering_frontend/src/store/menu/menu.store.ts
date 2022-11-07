import { writable } from 'svelte/store';
import type { IMenu } from 'types';

const initialMenuState: IMenu = {
  id: '',
  name: '',
  price: '',
  image_url: '',
};

export const menuStore = writable(initialMenuState);
