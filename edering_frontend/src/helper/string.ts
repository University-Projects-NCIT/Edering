export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPrice = (str: string) => {
  return 'Rs' + str.split('.')[0];
};
