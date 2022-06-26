import type { BtnSizes, BtnVariants, BtnTypes } from 'types';

export const getButtontype = ({
  type,
  variant,
}: {
  type: BtnTypes;
  variant: BtnVariants;
}) => {
  if (variant === 'primary' && type === 'filled') return 'btn-primary-filled';
  if (variant === 'primary' && type === 'outlined') {
    return 'btn-primary-outlined';
  }
  if (variant === 'secondary' && type === 'filled') {
    return 'btn-secondary-filled';
  }
  if (variant === 'secondary' && type === 'outlined') {
    return 'btn-secondary-outlined';
  }
  if (variant === 'dark' && type === 'filled') return 'btn-dark-filled';
  if (variant === 'dark' && type === 'outlined') return 'btn-dark-outlined';
  if (variant === 'gray' && type === 'filled') return 'btn-gray-filled';
  if (variant === 'transparent') return 'btn-transparent-outlined';
  return 'btn-primary-filled';
};

export const getButtonSize = ({ size }: { size: BtnSizes }) => {
  if (size === 'normal') return 'btn-normal';
  if (size === 'medium') return 'btn-medium';
  if (size === 'small') {
    return 'btn-small';
  }

  return 'btn-normal';
};

export default getButtonSize;
