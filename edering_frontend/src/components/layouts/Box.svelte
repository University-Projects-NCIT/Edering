<script lang="ts">
  import { getAlignment, getJustify, getRounded, getShadow } from './layout';
  import type { Alignment, Rounded, Shadow, Justification } from './layout';

  export let rounded: Rounded = '';
  export let shadow: Shadow = '';
  export let onClick: (() => void) | undefined = undefined;
  export let style: string | undefined = undefined;
  export let align: Alignment | undefined = undefined;
  export let justify: Justification | undefined = undefined;
  export let flow: 'vertical' | 'horizontal' | undefined = undefined;
  export let className = '';
  export let position: 'relative' | 'absolute' | undefined = undefined;
  const checkFlex = () => {
    if (align || justify || flow) return 'flex';
    return '';
  };

  $: alignItems = getAlignment(align ?? '');
  $: justifyItems = getJustify(justify ?? '');
  $: roundedValue = getRounded(rounded);
  $: shadowValue = getShadow(shadow);
  $: getFlow = flow ? (flow === 'vertical' ? 'flex-col' : 'flex-row') : '';
  $: flex = checkFlex();
  $: getPosition = position ?? '';
</script>

<div
  on:click={onClick}
  class="{flex} {onClick
    ? 'cursor-pointer'
    : ''} {getFlow} {className} {getPosition} {alignItems} {roundedValue} {shadowValue} {justifyItems}"
  {style}
>
  <slot />
</div>
