<script lang="ts">
  import type { BtnSizes, BtnTypes, BtnVariants } from 'types';
  import getButtonSize, { getButtontype } from './button';

  export let variant: BtnVariants = 'primary';
  export let type: BtnTypes = 'outlined';
  export let size: BtnSizes = 'normal';
  export let label: string = '';
  export let link: string = '';
  export let buttonEventType: 'submit' | 'button' = 'button';
  export let full = false;
  export let disabled = false;

  $: buttonSize = getButtonSize({ size });
  $: buttonType = getButtontype({ type, variant });
  $: fullWidth = full ? 'w-full' : '';
</script>

{#if link}
  <a href={link} class={fullWidth}>
    <button on:click class="btn {buttonSize} {buttonType} {fullWidth}">
      {label}
    </button>
  </a>
{:else}
  <button
    on:click
    class="btn {buttonSize} {buttonType} {fullWidth}"
    type={buttonEventType}
    {disabled}
  >
    {label}
  </button>
{/if}
