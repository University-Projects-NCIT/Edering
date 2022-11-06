<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import type { IMenu } from 'types';
  import AddRemoveItem from './AddRemoveItem.svelte';

  export let item: IMenu;
</script>

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
