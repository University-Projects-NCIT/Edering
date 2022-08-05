import type { BodySizes } from 'types';

export const getBodyStyle = ({ size }: { size: BodySizes }) => {
  if (size === 'normal') return 'body-normal';
  if (size === 'small') return 'body-small';
  if (size === 'medium') return 'body-medium';
  return 'body-normal';
};
