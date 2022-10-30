import type { IMenu } from './menu.types';

export interface IFoodCategory {
  id?: string;
  c_name?: string;
  image_id?: string;
  provider?: string;
  menus?: IMenu[];
}
