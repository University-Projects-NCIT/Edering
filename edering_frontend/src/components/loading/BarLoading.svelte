<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { BarLoader } from 'svelte-loading-spinners';

  export let isLoading = true;
  export let className = 'w-full';
</script>

{#if isLoading}
  <Box {className} align="center" justify="center">
    <BarLoader size="100" unit="px" duration="3s" />
  </Box>
{:else}
  <slot />
{/if}
