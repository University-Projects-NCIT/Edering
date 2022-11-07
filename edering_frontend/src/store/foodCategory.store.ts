import { writable } from 'svelte/store';
import type { IFoodCategory } from 'types';

const initialFoodCategory: IFoodCategory = {
  c_name: '',
  image_id: '',
  provider: '',
  menus: [],
};

export const foodCategoryStore = writable(initialFoodCategory);
