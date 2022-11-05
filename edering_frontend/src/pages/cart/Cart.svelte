<script lang="ts">
  import Button from 'components/buttons/Button.svelte';
  import Box from 'components/layouts/Box.svelte';
  import AddRemoveItem from 'pages/restaurant_detail/menu/components/AddRemoveItem.svelte';
  import { cartStore } from 'store';

  $: cartItems = $cartStore.cartItems;
  let currentTotal = 0;

  $: newCartItems = cartItems.map(item => {
    item.total = Number(item.price) * Number(item.quantity);
    return item;
  });

  const calculateTotal = () => {
    currentTotal = 0;
    newCartItems.forEach(item => (currentTotal += item.total ?? 0));
  };

  $: newCartItems, calculateTotal();
</script>

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

      <Box className="flex justify-center mt-4">
        <Button size="medium">Confirm Order</Button>
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
