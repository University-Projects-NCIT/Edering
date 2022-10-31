import { writable } from 'svelte/store';
import type { IProvider } from 'types';

const providerState: IProvider = {
  id: '',
  name: '',
  location: '',
  image_id: '',
  known_for: '',
  open_time: '',
  close_time: '',
  created_at: Date.now().toString(),
  food_categories: [],
  comments: [],
  ratings: [],
  provider_order: [],
};

export const provider = writable(providerState);
