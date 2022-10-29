import { writable } from 'svelte/store';
import type { Provider, Order } from 'types';

const providerState: Provider = {
  id: '',
  name: '',
  location: '',
  image_id: '',
  known_for: '',
  open_time: '',
  close_time: '',
  created_at: Date.now(),
  food_categories: [],
  comments: [],
  ratings: [],
  provider_order: [],
};

export const provider = writable(providerState);
