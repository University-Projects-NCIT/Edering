export type BtnVariants =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'gray'
  | 'transparent';

export type BtnSizes = 'normal' | 'medium' | 'small';

export type BtnTypes = 'filled' | 'outlined';

export type BtnTypeCombination = `btn-${BtnVariants}-${BtnSizes}-${BtnTypes}`;
