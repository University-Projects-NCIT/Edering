import type { IOrder } from './orders.types';
import type { IUserScan } from './userScan.types';

export interface ICustomer {
  id?: string;
  name?: string;
  email?: string;
  profile_image?: string,
  customer_order?: IOrder[];
  user_scan?: IUserScan[];
}
