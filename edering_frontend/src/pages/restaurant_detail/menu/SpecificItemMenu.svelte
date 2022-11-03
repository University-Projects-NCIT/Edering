<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import { LoadingUI } from 'components';
  import Box from 'components/layouts/Box.svelte';
  import { request } from 'helper';
  import { cartStore } from 'store/cart/cart.store';
  import { onMount } from 'svelte';
  import { ApiRequestMethods, IFoodCategory } from 'types';
  import type { IMenu } from 'types/menu.types';
  import AddRemoveItem from './components/AddRemoveItem.svelte';

  $: console.log('c_id', $params);
  $: cId = $params?.c_id;
  let isItemAddedToCart = false;
  let isLoading = false;
  let foodCategory: IFoodCategory;
  let menus: IMenu[] = [];

  $: isCartContainsItem = $cartStore.cartItems.length > 0;
  $: isCartContainsItem
    ? (isItemAddedToCart = true)
    : (isItemAddedToCart = false);

  onMount(async () => {
    if (!cId) {
      alert('no food category id');
      return;
    }
    isLoading = true;
    const response: IFoodCategory[] = await request({
      url: `/food_categories/?id=${cId}`,
      method: ApiRequestMethods.get,
    });
    isLoading = false;
    if (response[0]) {
      foodCategory = response[0];
      if (foodCategory.menus?.length ?? 0 > 0) {
        menus = foodCategory.menus ?? [];
      }
    }
  });

  const handleClickOnCart = () => {
    $goto('/cart');
  };
</script>

<Box className="pt-5 px-2 space-y-2 pb-11">
  <Box flow="horizontal" align="center">
    <h1
      class="text-base text-black-primary font-bold w-full flex justify-center"
    >
      {foodCategory?.c_name}
    </h1>
    <Box
      onClick={handleClickOnCart}
      className="bg-gray-primary p-2 rounded-full hover:cursor-pointer relative"
    >
      <img class="w-4" src="/icons/cart.svg" alt="" />
      {#if isItemAddedToCart}
        <span
          class="bg-yellow-primary rounded-full absolute top-2 left-"
          style="width: 0.3rem; height: 0.3rem; top: 0.4rem; left: 1rem"
        />
      {/if}
    </Box>
  </Box>
  {#if isLoading}
    <LoadingUI />
  {:else if menus.length > 0}
    <Box className="">
      <!-- <h3 class="text-sm font-bold text-black-primary">Chicken</h3> -->
      <!-- chicken items card container -->
      <Box className="space-y-2">
        {#each menus as item}
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
                  <AddRemoveItem {item} />
                </Box>
              </Box>
            </Box>
          </Box>
        {/each}
      </Box>
    </Box>
  {:else}
    <p class="text-center">No data found</p>
  {/if}
</Box>
