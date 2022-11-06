export type BtnVariants =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'gray'
  | 'transparent';

export type BtnSizes = 'normal' | 'medium' | 'small';

export type BtnTypes = 'filled' | 'outlined';

export type BtnTypeCombination = `btn-${BtnVariants}-${BtnSizes}-${BtnTypes}`;

export type ColorTypes = 'primary' | 'secondary' | 'tertiary';

export type ColorScheme = 'pink' | 'purple' | 'gray' | 'black' | 'white2';

export type TextColorCombination = `text-${ColorScheme}-${ColorTypes}`;

export type BGColorCombination = `bg-${ColorScheme}-${ColorTypes}`;
