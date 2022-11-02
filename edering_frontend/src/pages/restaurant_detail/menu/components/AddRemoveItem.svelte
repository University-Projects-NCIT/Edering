<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { cartStore } from 'store/cart/cart.store';
  import type { IMenu } from 'types/menu.types';
  // import { cartStore } from 'store/cart/cart.store';

  export let item: IMenu;
  console.log('specificitem', item);

  $: cartItemsQuantity = $cartStore.cartItems.length ?? 0;
  let showDecrementIcon = false;
  let quantityCount = 0;

  // export let incrementQuantity: () => void;
  // export let decrementQuantity: () => void;

  const addItemToCart = () => {
    console.log('additem', item);
    // cartStore.inc;
    quantityCount++;
    cartStore.addToCart(item);
  };

  const removeItemFromCart = () => {
    // cartStore.decrementQty();
    if (quantityCount < 1) return;
    quantityCount--;
    console.log('removeitem', item);
    cartStore.removeFromCart(item);
  };

  $: console.log('cartstore', $cartStore);

  $: if (quantityCount > 0) {
    showDecrementIcon = true;
  } else {
    showDecrementIcon = false;
  }
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
      {quantityCount}
    </p>
  {/if}

  <p
    on:click={addItemToCart}
    class="bg-yellow-primary text-white leading-4 w-4 text-center rounded-full hover:cursor-pointer"
  >
    +
  </p>
</Box>
