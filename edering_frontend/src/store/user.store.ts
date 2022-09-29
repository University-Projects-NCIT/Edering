import { writable } from 'svelte/store';
import type { User } from 'types';

let userState: User = {
  id: '',
  type: '', // provider eg Hotels , customer eg Customer in hotel
  name: '',
  email: '',
  imageUrl: '',
};

export const user_store = writable(userState);
