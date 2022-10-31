import type { IComment } from './comment.types';
import type { IFoodCategory } from './foodCategory.types';
import type { IOrder } from './orders.types';
import type { IRating } from './rating.types';

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
  provider_order?: IOrder[];
}

export interface IListOfResturants {
  id?: string;
  imageId?: string;
  name?: string;
  knownFor?: string;
  openTime?: string;
  closeTime?: string;
  location?: string;
  rating?: number;
}
