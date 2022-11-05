<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { cartStore, ICartItem } from 'store/cart/cart.store';
  import type { IMenu } from 'types/menu.types';

  export let item: IMenu | null = null;
  export let cartPageItem: ICartItem | null = null;
  let showDecrementIcon = false;

  $: if (item) {
    cartPageItem = {
      ...item,
      quantity: 0,
    };
  }
  $: quantity =
    $cartStore.cartItems.filter(currItem => currItem.id === cartPageItem?.id)[0]
      ?.quantity ?? 0;

  const addItemToCart = () => {
    if ($cartStore.isLoading) return;
    quantity++;
    cartPageItem = {
      ...cartPageItem,
      quantity,
    };
    cartStore.addToCart($cartStore, cartPageItem);
  };

  const removeItemFromCart = () => {
    if ($cartStore.isLoading) return;
    if (quantity < 1) return;
    quantity--;
    cartPageItem = {
      ...cartPageItem,
      quantity,
    };
    cartStore.removeFromCart($cartStore, cartPageItem);
  };

  $: quantity > 0 ? (showDecrementIcon = true) : (showDecrementIcon = false);
</script>

<Box flow="horizontal" align="center" className="space-x-2">
  {#if showDecrementIcon}
    <p
      on:click={removeItemFromCart}
      class="bg-white text-black-primary text-lg leading-4 w-4 text-center rounded-full hover:cursor-pointer"
    >
      -
    </p>
    <p class="text-black-primary text-xs font-medium">
      {quantity}
    </p>
  {/if}

  <p
    on:click={addItemToCart}
    class="bg-yellow-primary text-white leading-4 w-4 text-center rounded-full hover:cursor-pointer"
  >
    +
  </p>
</Box>
