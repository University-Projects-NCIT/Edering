<script lang='ts'>
  import Box from 'components/layouts/Box.svelte';
  import { customer } from 'store';
  import type { IOrder } from 'types';
  import dayjs from 'dayjs'
  import BarLoader from 'svelte-loading-spinners/dist/ts/BarLoader.svelte';

  export let onLogout = () => {}

  $: orders  = $customer.customer_order  ?? []

  const onClickHistory = () => {
      //goto history 
  }

</script>

<Box className='flex flex-col'>
  <Box className="px-4">
    <Box flow='horizontal' align='center'>
      <h1 class="text-2xl font-bold pb-4 mt-6">Customer Profile</h1>
      <Box
        onClick={onLogout}
        className="bg-gray-primary p-2 rounded-full hover:cursor-pointer"
      >
        <img class="w-4" src="/icons/logout.svg" alt="" />
      </Box>
    </Box>
    <Box flow='horizontal'>
      <img 
        class="inline h-20 w-20 rounded-lg"
        src = { $customer.profile_image }
        alt=""/>
      <Box flow='vertical' className="pl-4">
        <h1 class="text-sm">{$customer.name}</h1>
        <h1 class="text-sm">{$customer.email}</h1>
        <h1 class="text-sm">Total orders: {$customer.customer_order?.length}</h1>
        <h1 class="text-sm">Total scans: {$customer.user_scan?.length}</h1>
      </Box>  
    </Box>
    <Box flow='horizontal' justify='center' onClick={onClickHistory} className="p-4 rounded-xl mt-8 w-full bg-gray-primary">
      <h1 class="text-md font-bold">Analyse History</h1>
    </Box>
  </Box>
  <Box className='flex-1 bg-gray-primary rounded-tr-xl rounded-tl-xl p-4 mt-8'>
    <Box className=''>
      {#each orders as order}
        <Box>
          <p class="text-sm inline">{order.order_to?.name}</p> <p class="inline text-sm">{dayjs(order.order_date_time ?? '').format('MMM D, YYYY (hh:mm A)')}</p>
          <p class="text-sm block"> Cost: ${order.order_cost}</p>
        </Box>
        <Box className="h-4"/>
      {/each}
    </Box>
  </Box>
</Box>