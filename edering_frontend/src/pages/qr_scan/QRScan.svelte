<script>
  import Box from 'components/layouts/Box.svelte';

  const prevScanInfo = [
    {
      scan_url: 'https:edering.com/burger_house/profile',
      pofile_name: 'Burger House',
    },
    {
      scan_url: 'https:edering.com/burger_house/profile',
      pofile_name: 'Burger House',
    },
    {
      scan_url: 'https:edering.com/burger_house/profile',
      pofile_name: 'Burger House',
    },
  ];
</script>

<Box>
  <Box
    flow="horizontal"
    justify="center"
    align="center"
    className="mt-8 space-x-3"
  >
    <Box
      className="rounded-2xl bg-gray-primary w-20 h-20"
      justify="center"
      align="center"
    >
      <img src="/icons/camera.svg" alt="camera" />
    </Box>
    <Box
      className="rounded-2xl bg-yellow-primary w-20 h-20 hover:cursor-pointer hover:bg-gray-primary"
      justify="center"
      align="center"
    >
      <p class="text-black-primary font-medium text-sm">Scan</p>
    </Box>
  </Box>

  <Box className="pt-3 px-2">
    <h3 class="text-base font-bold text-black-primary mb-2">Previous Scan</h3>
    {#each prevScanInfo as item}
      <p class="text-black-primary text-sm font-medium leading-3 mt-2">
        {item.pofile_name}
      </p>
      <a href="#" class="text-blue-600 text-xs ">{item.scan_url}</a>
    {/each}
  </Box>
</Box>
