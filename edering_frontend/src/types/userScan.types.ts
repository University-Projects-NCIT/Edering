import type { ICustomer } from './customer.types';

export interface IUserScan {
  id?: number;
  scan_url?: string;
  date_time?: string;
  customer_id?: ICustomer;
}
