<script lang="ts">
  import Box from 'components/layouts/Box.svelte';

  import BottomFixedNav from 'pages/home/components/BottomFixedNav.svelte';
</script>

<slot />
<!-- <footer>footer</footer> -->
<Box className="fixed bottom-0 w-full">
  <BottomFixedNav />
</Box>
