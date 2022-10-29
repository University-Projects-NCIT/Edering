import type { IComment } from './comment.types';
import type { IFoodCategory } from './foodCategory.types';
import type { IRating } from './rating.types';

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

export interface IProviderOrder {
  id?: string;
  food_name?: string;
  food_count?: string;
  order_date_time?: string;
  order_status?: OrderStatus;
  order_cost?: string;
  order_from?: IOrderFrom;
  order_to?: IOrderTo;
}

export interface IProvider {
  id?: string;
  name?: string;
  location?: string;
  image_id?: string;
  known_for?: string;
  open_time?: string;
  close_time?: string;
  created_at?: string;
  food_categories?: IFoodCategory[];
  comments?: IComment[];
  ratings?: IRating[];
  provider_order?: IProviderOrder;
}
