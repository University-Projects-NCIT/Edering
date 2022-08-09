<script lang="ts">
  import Box from 'components/layouts/Box.svelte';

  const menuItems = [
    {
      name: 'Home',
      icon: '/icons/home.svg',
    },
    {
      name: 'History',
      icon: '/icons/history.svg',
    },
    {
      name: 'QR Scan',
      icon: '/icons/QR-scan.svg',
    },
    {
      name: 'Profile',
      icon: '/icons/user-profile.svg',
    },
  ];
</script>

<Box
  flow="horizontal"
  className="bg-gray-primary py-1"
  align="center"
  justify="around"
>
  {#each menuItems as item}
    <a href="/">
      <Box flow="vertical" align="center">
        <img class="w-4" src={item.icon} alt="" />
        <p class="mt-1" style="font-size: 0.6rem; line-height: 0.7rem">
          {item.name}
        </p>
      </Box>
    </a>
  {/each}
</Box>
