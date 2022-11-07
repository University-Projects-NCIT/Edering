<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { request } from 'helper';
  import { userType } from 'store';
  import type { IMenu } from 'types';
  import type { UserType } from 'types/UserType';
  import AddRemoveItem from './AddRemoveItem.svelte';

  export let item: IMenu;
  let whoIsUser: UserType;
  $: whoIsUser = $userType;

  export let handleRemoveMenu = id => {};
</script>

<Box flow="horizontal" className="bg-gray-primary rounded-3xl p-4 ">
  <img class="w-20 h-16 rounded-2xl" src={item?.image_url ?? ''} alt="" />
  <Box className="px-3 space-y-2 flex-1">
    <h4 class="text-xs text-black-primary font-medium">
      {item?.name}
    </h4>
    <Box flow="horizontal" align="center" justify="between">
      <p class="text-xs text-yellow-primary font-medium">
        {item?.price}
      </p>
      <Box>
        {#if whoIsUser == 'Customer'}
          <AddRemoveItem {item} />
        {/if}
        {#if whoIsUser == 'Provider'}
          <Box className="hover:bg-yellow-primary w-fit p-1">
            <img
              class="w-3"
              on:click={() => handleRemoveMenu(item?.id)}
              src="/icons/close-icon.svg"
              alt=""
            />
          </Box>
        {/if}
      </Box>
    </Box>
  </Box>
</Box>
