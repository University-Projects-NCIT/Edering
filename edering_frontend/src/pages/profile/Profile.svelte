<script>
  import Box from 'components/layouts/Box.svelte';

  const userInfo = {
    name: 'Grishmin Karki',
    imgUrl: 'https://avatars.githubusercontent.com/u/46286762?v=4',
  };

  // const profileItems = [{
  //   name: ''
  // }];
</script>

<Box className="px-2 py-4">
  <Box flow="horizontal" align="center">
    <h1
      class="text-black-primary font-medium text-sm w-full  flex  justify-center "
    >
      Profile
    </h1>
    <Box className="bg-gray-primary p-2 rounded-full hover:cursor-pointer">
      <img class="w-4" src="/icons/logout.svg" alt="" />
    </Box>
  </Box>

  <Box flow="vertical" justify="center" align="center" className="mt-12">
    <Box>
      <img class="w-20 rounded-full" src={userInfo.imgUrl} alt="" />
    </Box>
    <Box className="mt-2">
      <p class="text-black-primary text-base font-bold">{userInfo.name}</p>
    </Box>
  </Box>

  <Box className="bg-gray-primary rounded-xl p-4 mt-3">
    <p class="text-sm font-medium">
      Total Scans: <span class="text-yellow-primary">10</span>
    </p>
    <p class="text-sm font-medium">
      Total Orders: <span class="text-yellow-primary">10</span>
    </p>
    <p class="text-sm font-medium">
      Total Amount Paid: <span class="text-yellow-primary">1000</span>
    </p>
  </Box>
</Box>
