export enum RestaurantDetailTab {
  Menu = 'MENU',
  About = 'ABOUT',
  Chat = 'CHAT',
  Comment = 'COMMENT',
}

export class restaurantDetailRoute {
  static route = '/restaurant?restaurant_id=';

  static getRoute = ({
    restaurantId,
    tab,
    additionalQuery = '',
  }: {
    restaurantId: string;
    tab: RestaurantDetailTab;
    additionalQuery?: string;
  }) => {
    return `${
      restaurantDetailRoute.route
    }${restaurantId}&active_tab=${tab.toLowerCase()}${additionalQuery}`;
  };
}
