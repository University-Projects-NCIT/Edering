<script lang="ts">
  import { LoadingUI } from 'components';
  import Box from 'components/layouts/Box.svelte';
  import StarRating from 'svelte-star-rating';
  import type { IListOfResturants, IProvider } from 'types';
  export let restaurant: IListOfResturants;
</script>

{#if restaurant}
  <Box className="pt-2 px-2 space-y-5">
    <Box>
      <h1 class="text-base font-medium">
        {restaurant?.name}
      </h1>
    </Box>
    <Box className="bg-gray-primary rounded-2xl p-4 ">
      <Box>
        <h3 class="text-sm font-medium mb-2">Address</h3>
        <p class="text-xs">Mid-Baneshwor, Kathmandu</p>
      </Box>
    </Box>
    <Box className="bg-gray-primary rounded-2xl p-4 ">
      <Box>
        <h3 class="text-sm font-medium mb-2">Timing</h3>
        <p class="text-xs">Opening time: 10:00 AM</p>
        <p class="text-xs">Closing time: 10:00 PM</p>
      </Box>
    </Box>
    <Box className="bg-gray-primary rounded-2xl p-4 ">
      <Box>
        <h3 class="text-sm font-medium mb-2">Rating</h3>
        <StarRating
          rating={restaurant.rating ?? 0}
          config={{ size: 10, fullColor: '#FFA800' }}
        />
      </Box>
    </Box>
  </Box>
{:else}
  <p>Data Not found.......</p>
{/if}
