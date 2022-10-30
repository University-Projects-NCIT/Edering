import type { IOrder } from './orders.types';
import type { IUserScan } from './userScan.types';

export interface ICustomer {
  id?: string;
  customer_order?: IOrder[];
  user_scan?: IUserScan[];
}
