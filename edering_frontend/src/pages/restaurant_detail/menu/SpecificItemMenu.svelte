<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import { LoadingUI } from 'components';
  import Box from 'components/layouts/Box.svelte';
  import { request } from 'helper';
  import { userType } from 'store';
  import { cartStore } from 'store/cart/cart.store';
  import { onMount } from 'svelte';
  import { ApiRequestMethods, IFoodCategory } from 'types';
  import type { IMenu } from 'types/menu.types';
  import type { UserType } from 'types/UserType';
  import Item from './components/Item.svelte';

  $: pId = $params?.p_id;
  let isItemAddedToCart = false;
  let isLoading = false;
  let foodCategory: IFoodCategory;
  let menus: IMenu[] = [];
  let whoIsUser: UserType;
  $: whoIsUser = $userType;

  $: isCartContainsItem = $cartStore.cartItems.length > 0;
  $: isCartContainsItem
    ? (isItemAddedToCart = true)
    : (isItemAddedToCart = false);

  onMount(async () => {
    await getMenu();
  });

  const getMenu = async () => {
    if (!pId) {
      return;
    }
    isLoading = true;
    const response: IFoodCategory[] = await request({
      url: `/food_categories/?provider_id=${pId}`,
      method: ApiRequestMethods.get,
    });
    isLoading = false;
    if (response[0]) {
      foodCategory = response[0];
      if (foodCategory.menus?.length ?? 0 > 0) {
        menus = foodCategory.menus ?? [];
      } else {
        menus = [];
      }
    }
  };

  let isRemovingMenu = false;

  const handleRemoveMenu = async menuId => {
    //remove

    isRemovingMenu = true;
    const response: IMenu = await request({
      url: `/menus/${menuId}`,
      method: ApiRequestMethods.delete,
    });
    await getMenu();
    isRemovingMenu = false;
  };

  const handleClickOnCart = () => {
    $goto(`/cart?p_id=${pId}`);
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
  <Box>
    {#if whoIsUser == 'Provider'}
      <Box>
        <a
          style="text-decoration: underline;"
          class="hover:text-yellow-primary text-black-primary text-xs"
          href={`/add-menu?cId=${foodCategory?.id}`}>Add Menu</a
        >
      </Box>
    {/if}
  </Box>
  {#if isLoading || isRemovingMenu}
    <LoadingUI />
  {:else if menus.length > 0}
    <Box className="">
      <Box className="space-y-2">
        {#each menus as item}
          <Item {handleRemoveMenu} {item} />
        {/each}
      </Box>
    </Box>
  {:else}
    <p class="text-center">No data found</p>
  {/if}
</Box>
