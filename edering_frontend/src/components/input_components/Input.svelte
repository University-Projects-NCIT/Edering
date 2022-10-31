<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import type { HTMLInput } from 'types/input.types';
  export let placeholder = '';
  export let value = '';
  export let handleInput: (e: HTMLInput) => void = () => {};
</script>

<Box
  flow="horizontal"
  align="center"
  className="bg-gray-primary rounded-full text-xs border-2 focus-within:border-yellow-primary focus:outline-none focus:ring-transparent border-gray-primary"
>
  <input
    bind:value
    on:input={handleInput}
    class="bg-gray-primary text-black-primary px-3 py-1 w-full rounded-full border-0 focus:placeholder-transparent focus:outline-none focus:ring-transparent"
    type="text"
    id="search-bar"
    name="searchText"
    {placeholder}
  />
  <Box className="px-2">
    <img src="/icons/search-icon.svg" alt="search icon" />
  </Box>
</Box>
