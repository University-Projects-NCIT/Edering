import { writable } from 'svelte/store';
import type { IUser } from 'types';

let userState: IUser = {
  id: '',
  type: '', // provider eg Hotels , customer eg Customer in hotel
  name: '',
  email: '',
  imageUrl: '',
};

export const user_store = writable(userState);
