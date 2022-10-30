export enum OrderStatus {
  Ordered = 'ORDERED',
}

export interface IOrderFrom {
  id?: string;
}

export interface IOrderTo {
  id?: string;
  name?: string;
  location?: string;
  image_id?: string;
  known_for?: string;
  open_time?: string;
  close_time?: string;
  created_at?: string;
}

export interface IOrder {
  id?: string;
  food_name?: string;
  food_count?: string;
  order_date_time?: string;
  order_status?: OrderStatus;
  order_cost?: string;
  order_from?: IOrderFrom;
  order_to?: IOrderTo;
}
