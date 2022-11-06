<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<Box className="">
  <Box
    onClick={() => dispatch('click')}
    position="absolute"
    rounded="xl"
    align="center"
    justify="center"
    className="p-2 w-8 h-8 bg-gray-primary top-3 right-3 hover:bg-yellow-primary transition duration-300 cursor-pointer"
  >
    <img src="/icons/close-icon.svg" alt="close icon" />
  </Box>
</Box>
