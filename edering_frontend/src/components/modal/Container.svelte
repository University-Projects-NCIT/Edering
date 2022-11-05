<script lang="ts">
  import CloseButton from './CloseButton.svelte';
  import type { BGColorCombination } from 'types';
  import CloseButtonSmall from './CloseButtonSmall.svelte';
  import Box from 'components/layouts/Box.svelte';
  export let modalTitle: string = '';
  // export let size: string = 'modal-lg';
  export let onModalClose: () => void;
  export let display = true;
  export let bgColor: BGColorCombination | 'bg-white' = 'bg-white';
  export let className = '';
  export let overflow: 'overflow-visible' | 'overflow-y-auto' =
    'overflow-y-auto';
  export let closeButtonSize: 'large' | 'small' = 'large';

  $: displayModal = display ? 'block' : 'hidden';
</script>

<Box
  className="{displayModal} modal fixed z-40 inset-0 h-screen w-screen overflow-x-hidden"
  align="center"
  justify="center"
>
  <Box
    position="relative"
    flow="vertical"
    rounded="3xl"
    className="{bgColor} max-h-full w-11/12 mx-auto {className}"
  >
    {#if closeButtonSize == 'large'}
      <CloseButton on:click={onModalClose} />
    {:else}
      <CloseButtonSmall on:click={onModalClose} />
    {/if}
    <Box
      align="stretch"
      className="w-full max-h-full custom-scroll pr-6 {overflow}"
    >
      <Box align="stretch" className="flex-none hidden lg:flex">
        <slot name="image-section" />
      </Box>
      <Box justify="between" flow="vertical" className="w-full">
        <Box className="w-full">
          {#if modalTitle}
            <Box className="w-3/4 lg:w-full">
              <h1>{modalTitle}</h1>
            </Box>
          {/if}
          <slot name="before-form-section" />
          <slot name="form-section" />
        </Box>
      </Box>
    </Box>

    <slot name="description-section" />
  </Box>
</Box>

<style>
  :global(.modal) {
    backdrop-filter: blur(8px) brightness(63%);
    -webkit-backdrop-filter: blur(8px) brightness(63%);
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
