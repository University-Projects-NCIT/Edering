<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { Circle3 } from 'svelte-loading-spinners';

  export let duration = '3s';
  export let size = '80';
  export let unit = 'px';
</script>

<Box className="flex items-center justify-center w-full h-screen">
  <Circle3 {duration} {size} {unit} />
</Box>
