<script lang="ts">
  import type { BodySizes } from 'types';
  import { getBodyStyle } from './text';

  export let className = '';
  export let color = 'text-black-primary';
  export let size: BodySizes = 'normal';
  export let style = '';

  $: sizeStyle = getBodyStyle({ size });
</script>

<p {style} class="{className} {color} {sizeStyle}">
  <slot />
</p>
