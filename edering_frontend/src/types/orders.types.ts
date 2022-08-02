import type { IMenu } from './menu.types';

export interface IOrders {
  id?: string;
  order_from?: string;
  order_to?: string;
  order_date_time?: string;
  food?: IMenu;
  delivered_status?: boolean;
}
