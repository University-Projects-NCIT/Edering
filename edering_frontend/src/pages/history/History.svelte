<script lang="ts">
  import { LoadingUI } from 'components';
  import Box from 'components/layouts/Box.svelte';
  import dayjs from 'dayjs';
  import { formatPrice, request } from 'helper';
  import { userType, user_store } from 'store';
  import { onMount } from 'svelte';
  import { ApiRequestMethods, IOrder } from 'types';

  interface IOrderHistory {
    foodName?: string;
    orderDateTime?: string;
    orderCost?: string;
    foodCount?: number;
    restaurantName?: string;
    restaurantLocation?: string;
    customerName?: string;
    customerEmail?: string;
  }

  let orderHistory: IOrderHistory[] = [];
  let isLoading = false;
  $: userId = $user_store.id;
  $: user = $userType;

  $: console.log('userrrrrrr', user);

  const prepareHistoryData = (item: IOrder): IOrderHistory => {
    return {
      foodName: item.food_name,
      foodCount: item.food_count,
      orderCost: item.order_cost,
      customerEmail: item.order_from?.email,
      customerName: item.order_from?.name,
      orderDateTime: dayjs(item.order_date_time).format(
        'MMM D, YYYY (hh:mm A)'
      ),
      restaurantLocation: item.order_to?.location,
      restaurantName: item.order_to?.name,
    };
  };

  interface IFinalOrderHistoryData {
    [name: string]: IOrderHistory[];
  }

  let data: IFinalOrderHistoryData = {};

  $: console.log('data', data);

  $: console.log('orderhistory', orderHistory);

  onMount(async () => {
    // call http://127.0.0.1:8000/orders/?customer_id=skdjhgsjdg
    isLoading = true;
    const response: IOrder[] = await request({
      url: `/orders/?${
        user === 'Customer' ? 'customer_id' : 'provider_id'
      }=${userId}`,
      method: ApiRequestMethods.get,
    });

    if (response && response.length > 0) {
      orderHistory = response.map(prepareHistoryData);
    }
    orderHistory.forEach(item => {
      console.log('ifasfasf', item.orderDateTime?.split(',')[0]);
      console.log('today', dayjs().format('MMM D'));
      let today = dayjs().format('MMM D');
      let dateTime = item.orderDateTime?.split(',')[0] ?? '';

      if (!data[dateTime === today ? 'Today' : dateTime]) {
        data[dateTime === today ? 'Today' : dateTime] = [item];
      } else if (data[dateTime === today ? 'Today' : dateTime]) {
        data[dateTime === today ? 'Today' : dateTime] = [
          ...data[dateTime === today ? 'Today' : dateTime],
          item,
        ];
      }
    });

    isLoading = false;
  });
</script>

<Box className="pb-8 px-2 pt-5">
  <Box>
    <h1
      class="text-base text-black-primary font-bold w-full flex justify-center"
    >
      History
    </h1>
  </Box>

  {#if isLoading}
    <LoadingUI />
  {:else if Object.keys(data).length !== 0}
    {#each Object.entries(data) as [date, value]}
      <Box className="mt-2">
        <h3>{date}</h3>
        <Box className="bg-gray-primary rounded-md p-3">
          {#each value as item}
            <Box className="mt-2">
              <h3 class="text-sm font-bold">
                {user === 'Customer' ? item.restaurantName : item.customerName}
                <span style="color: #aba9a9;" class=" font-bold text-xs ml-1"
                  >{item.orderDateTime}</span
                >
              </h3>
              <p class="text-xs ">
                {item.foodName}<span
                  style="color: #aba9a9;"
                  class=" font-bold text-xs ml-1"
                >
                  (x{item.foodCount})</span
                >
              </p>
              <p class="text-xs ">
                Total: <span class="font-normal"
                  >{formatPrice(item.orderCost ?? '')}
                </span>
              </p>
            </Box>
          {/each}
        </Box>
      </Box>
    {/each}
  {:else}
    <p>No History available...</p>
  {/if}
</Box>
