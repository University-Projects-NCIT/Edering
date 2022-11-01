import type { IRating } from 'types';

export const calculateRating = (ratings: IRating[]) => {
  const noOfRatings = Number(ratings.length);
  let avgRating = 0;
  if (noOfRatings > 0) {
    ratings.map(item => {
      avgRating += Number(item.rating);
    });
  } else {
    return 0;
  }

  let calculatedRating = avgRating / noOfRatings;

  if (calculatedRating % 1 === 0) {
    return calculatedRating;
  }

  return Number(calculatedRating.toFixed(2));
};
