<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { customer, provider } from 'store';
  import type { IOrder } from 'types';
  import dayjs from 'dayjs';
  import { goto } from '@roxi/routify';

  export let onLogout = () => {};

  const onClickHistory = () => {
    //goto history
    $goto('/history');
  };

  const onEditProvider = () => {
    $goto('/add-provider');
  };
  const onEditMenu = () => {};
  const onEditHistory = () => {};
</script>

<Box className="h-screen">
  <Box>
    <Box className="px-4">
      <Box className="flex w-full items-center pb-4">
        <h1 class="flex-1 text-2xl font-bold mt-6">Provider Profile</h1>
        <Box
          onClick={onLogout}
          className="flex justify-center items-center bg-gray-primary w-8 h-8 p-2 rounded-full hover:cursor-pointer"
        >
          <img class="w-8 h-8" src="/icons/logout.svg" alt="" />
        </Box>
      </Box>
    </Box>
    <Box flow="horizontal">
      <img
        class="inline h-24 w-full object-cover"
        src={$provider.image_id}
        alt=""
      />
    </Box>
    <Box className="px-4">
      <Box
        flow="horizontal"
        justify="center"
        onClick={onClickHistory}
        className="p-4 rounded-xl mt-8 mb-2 w-full bg-gray-primary"
      >
        <h1 class="text-md font-bold">Analyse History</h1>
      </Box>
      <Box className="py-2">
        <h1 class="text-base font-medium inline pr-2 pt-2">{$provider.name}</h1>
        <img
          on:click={onEditProvider}
          class="inline w-4 h-4"
          src="/icons/edit_btn.svg"
          alt=""
        />
      </Box>
      <Box className="py-2">
        <h1 class="text-base font-medium inline pr-2 pt-2">
          {$provider.location}
        </h1>
        <img
          on:click={onEditProvider}
          class="inline w-4 h-4"
          src="/icons/edit_btn.svg"
          alt=""
        />
      </Box>
      <Box className="py-2">
        <h1 class="text-md font-medium inline pr-2 pt-2">
          Open time: {$provider.open_time}
        </h1>
        <img
          on:click={onEditProvider}
          class="inline w-4 h-4"
          src="/icons/edit_btn.svg"
          alt=""
        />
      </Box>
      <Box className="py-2">
        <h1 class="text-md font-medium inline pr-2 pt-2">
          Open time: {$provider.close_time}
        </h1>
        <img
          on:click={onEditProvider}
          class="inline w-4 h-4"
          src="/icons/edit_btn.svg"
          alt=""
        />
      </Box>
    </Box>
  </Box>
</Box>
