<script lang="ts">
  import Button from 'components/buttons/Button.svelte';
  import Box from 'components/layouts/Box.svelte';
  import AddRemoveItem from 'pages/restaurant_detail/menu/components/AddRemoveItem.svelte';
  import Modal from 'components/modal/Container.svelte';
  import { cartStore, user_store } from 'store';
  import BarLoading from 'components/loading/BarLoading.svelte';
  import { ApiRequestMethods, IOrder, OrderStatus } from 'types';
  import { request } from 'helper';
  import { goto, params } from '@roxi/routify';

  $: pId = $params?.p_id;
  $: cartItems = $cartStore.cartItems;
  let currentTotal = 0;
  let isOrdering = false;
  let display = false;

  let tableNumber;

  $: newCartItems = cartItems.map(item => {
    item.total = Number(item.price) * Number(item.quantity);
    return item;
  });

  $: userId = $user_store.id;

  const calculateTotal = () => {
    currentTotal = 0;
    newCartItems.forEach(item => (currentTotal += item.total ?? 0));
  };

  let orderMessage = '';

  const makeOrder = async () => {
    // api request

    newCartItems.forEach(async item => {
      const response: IOrder = await request({
        url: '/orders/',
        method: ApiRequestMethods.post,
        data: {
          food_name: item.name,
          food_count: item.quantity,
          order_cost: item.total,
          order_from: userId,
          order_to: pId,
          order_status: OrderStatus.Ordered,
        },
      });
      if (response) {
        orderMessage += `${response.food_name}-${response.food_count},`;
      }
    });
  };

  $: console.log('ordermsg', orderMessage);

  const handleOrder = async () => {
    isOrdering = true;

    await makeOrder();

    setTimeout(() => {
      orderMessage = `${orderMessage.slice(
        0,
        -1
      )}>${tableNumber}&senderId=${userId}&receiverId=${pId}`;
      isOrdering = false;
      display = false;
      tableNumber = '';
      $goto(`/chat?order_msg=${orderMessage}`);
    }, 800);
  };

  $: newCartItems, calculateTotal();

  $: console.log('tableeeeeeee', tableNumber);
</script>

<Modal {display} closeButtonSize="small" onModalClose={() => (display = false)}>
  <Box slot="form-section" className="p-6">
    <h2 class="text-sm text-black-primary">
      Are you sure you want to confirm the order?
    </h2>
    <Box justify="around" className="pt-8">
      <BarLoading isLoading={isOrdering}>
        <Button
          size="small"
          label="Yes"
          on:click={handleOrder}
          variant="secondary"
          type="filled"
        />
        <Button
          on:click={() => (display = false)}
          size="small"
          label="No"
          variant="primary"
          type="filled"
        />
      </BarLoading>
    </Box>
  </Box>
</Modal>

<Box className="pt-5 px-2 space-y-2 pb-11">
  <Box>
    <h1
      class="text-base uppercase text-black-primary font-bold w-full flex justify-center"
    >
      My Cart
    </h1>
  </Box>

  {#if cartItems.length > 0}
    <Box className="">
      <Box className="space-y-2">
        {#each cartItems as item}
          <Box flow="horizontal" className="bg-gray-primary rounded-3xl p-4 ">
            <!-- <img
              class="w-20 h-16 rounded-2xl"
              src={item?.image_uri_id ?? ''}
              alt=""
            /> -->
            <Box className="px-3 space-y-2 flex-1">
              <h4 class="text-xs text-black-primary font-medium">
                {item?.name}
              </h4>
              <Box flow="horizontal" align="center" justify="between">
                <p class="text-xs text-yellow-primary font-medium">
                  {item?.price}
                </p>
                <Box>
                  <AddRemoveItem cartPageItem={item} />
                </Box>
              </Box>
            </Box>
          </Box>
        {/each}
      </Box>

      <Box
        flow="horizontal"
        align="center"
        justify="around"
        className="mt-4 amount pt-2"
      >
        <p class="text-black-primary text-sm">Total</p>
        <p class="text-yellow-primary text-lg font-bold">{currentTotal}</p>
      </Box>

      <Box
        flow="horizontal"
        align="center"
        className="bg-gray-primary mt-4 rounded-full text-xs border-2 focus-within:border-yellow-primary focus:outline-none focus:ring-transparent border-gray-primary"
      >
        <input
          bind:value={tableNumber}
          class="bg-gray-primary text-black-primary px-3 py-2 w-full rounded-full border-0 focus:placeholder-transparent focus:outline-none focus:ring-transparent"
          type="text"
          placeholder="Enter table number..."
        />
      </Box>

      <Box className="flex justify-center mt-4">
        <Button
          on:click={() => {
            if ((tableNumber?.trim()?.length ?? 0) === 0) {
              alert('must provide table number');
              return;
            }
            display = true;
          }}
          size="medium">Confirm Order</Button
        >
      </Box>
    </Box>
  {:else}
    <Box className="pt-16">
      <img class="px-4" src="/icons/empty-cart.svg" alt="" />
      <p class="text-center text-yellow-primary">Cart is empty...</p>
    </Box>
  {/if}
</Box>

<style>
  :global(.amount) {
    border-top: 1px solid #ccc;
  }
</style>
