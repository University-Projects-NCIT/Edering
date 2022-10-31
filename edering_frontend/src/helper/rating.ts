import type { IRating } from 'types';

export const calculateRating = (ratings: IRating[]) => {
  const noOfRatings = ratings.length;
  let avgRating = 0;
  if (noOfRatings > 0) {
    ratings.map(item => {
      avgRating += Number(item.rating);
    });
  }
  return Number((avgRating / noOfRatings).toFixed(2));
};
