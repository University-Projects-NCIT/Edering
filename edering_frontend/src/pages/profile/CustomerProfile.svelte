<script lang='ts'>
  import Box from 'components/layouts/Box.svelte';
  import { customer } from 'store';
  import type { IOrder } from 'types';
  import dayjs from 'dayjs';

  export let onLogout = () => {}

  $: orders  = $customer.customer_order  ?? []

  const onClickHistory = () => {
      //goto history 
  }

</script>

<Box className='flex flex-col h-screen'>
  <Box className="px-4">
    <Box className='flex w-full items-center pb-4'>
      <h1 class="flex-1 text-2xl font-bold mt-6">Customer Profile</h1>
      <Box
        onClick={onLogout}
        className="flex justify-center items-center bg-gray-primary w-8 h-8 p-2 rounded-full hover:cursor-pointer"
      >
        <img class="w-8 h-8" src="/icons/logout.svg" alt="" />
      </Box>
    </Box>
    <Box flow='horizontal'>
      <img 
        class="inline h-20 w-20 rounded-lg"
        src = { $customer.profile_image }
        alt=""/>
      <Box flow='vertical' className="pl-4">
        <h1 class="text-sm font-medium">{$customer.name}</h1>
        <h1 class="text-sm font-medium">{$customer.email}</h1>
        <h1 class="text-sm font-medium">Total orders: {$customer.customer_order?.length}</h1>
        <h1 class="text-sm font-medium">Total scans: {$customer.user_scan?.length}</h1>
      </Box>  
    </Box>
    <Box flow='horizontal' justify='center' onClick={onClickHistory} className="p-4 rounded-xl mt-8 w-full bg-gray-primary">
      <h1 class="text-md font-bold">Analyse History</h1>
    </Box>
  </Box>
  <Box className='flex-grow bg-gray-primary rounded-tr-xl rounded-tl-xl p-4 mt-8'>
    <Box className=''>
      {#each orders as order}
        <Box>
          <p class="text-sm inline font-bold pr-2">{order.order_to?.name}</p> <p class="inline text-xs">{dayjs(order.order_date_time ?? '').format('MMM D, YYYY (hh:mm A)')}</p>
          <p class="text-sm block font-bold"> Cost: ${order.order_cost}</p>
        </Box>
        <Box className="h-4"/>
      {/each}
    </Box>
  </Box>
</Box>