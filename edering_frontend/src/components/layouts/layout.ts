export type Alignment =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | '';

export type Justification =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | '';

export type Rounded =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | 'none'
  | 'full'
  | '';

export type Shadow =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | 'none'
  | 'full'
  | '';

export const getAlignment = (align: Alignment) => {
  if (align === 'start') return 'items-start';
  if (align === 'center') return 'items-center';
  if (align === 'end') return 'items-end';
  if (align === 'baseline') return 'items-baseline';
  if (align === 'stretch') return 'items-stretch';
  return '';
};

export const getJustify = (justify: Justification) => {
  if (justify === 'start') return 'justify-start';
  if (justify === 'center') return 'justify-center';
  if (justify === 'end') return 'justify-end';
  if (justify === 'between') return 'justify-between';
  if (justify === 'around') return 'justify-around';
  if (justify === 'evenly') return 'justify-evenly';
  return '';
};

export const getRounded = (rounded: Rounded) => {
  if (rounded === 'lg') return 'rounded-lg';
  if (rounded === 'sm') return 'rounded-sm';
  if (rounded === 'md') return 'rounded-md';
  if (rounded === 'xl') return 'rounded-xl';
  if (rounded === '2xl') return 'rounded-2xl';
  if (rounded === '3xl') return 'rounded-3xl';
  if (rounded === '4xl') return 'rounded-4xl';
  if (rounded === '5xl') return 'rounded-5xl';
  if (rounded === '6xl') return 'rounded-6xl';
  if (rounded === 'full') return 'rounded-full';
  if (rounded === 'none') return 'rounded-none';
  return '';
};

export const getShadow = (shadow: Shadow) => {
  if (shadow === 'sm') return 'shadow-sm';
  if (shadow === 'lg') return 'shadow-lg';
  if (shadow === 'md') return 'shadow-md';
  if (shadow === 'xl') return 'shadow-xl';
  if (shadow === '2xl') return 'shadow-2xl';
  if (shadow === '3xl') return 'shadow-3xl';
  if (shadow === '4xl') return 'shadow-4xl';
  if (shadow === 'full') return 'shadow-full';
  if (shadow === 'none') return 'shadow-none';
  return '';
};
