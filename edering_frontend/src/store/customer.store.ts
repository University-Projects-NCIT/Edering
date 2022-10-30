import { writable } from 'svelte/store';
import type { ICustomer } from 'types/customer.types';

const customerState: ICustomer = {
  id: '',
  customer_order: [],
  user_scan: [],
};

export const customer = writable(customerState);
