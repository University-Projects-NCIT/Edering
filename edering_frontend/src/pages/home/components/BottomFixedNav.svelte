<script lang="ts">
  import Box from 'components/layouts/Box.svelte';

  const menuItems = [
    {
      name: 'Home',
      icon: '/icons/home.svg',
      route: '/',
    },
    {
      name: 'History',
      icon: '/icons/history.svg',
      route: '/history',
    },
    {
      name: 'QR Scan',
      icon: '/icons/QR-scan.svg',
      route: '/qr_scan',
    },
    {
      name: 'Profile',
      icon: '/icons/user-profile.svg',
      route: '/profile',
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
    <a href={item.route}>
      <Box flow="vertical" align="center">
        <img class="w-4" src={item.icon} alt="" />
        <p class="mt-1" style="font-size: 0.6rem; line-height: 0.7rem">
          {item.name}
        </p>
      </Box>
    </a>
  {/each}
</Box>
