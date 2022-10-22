<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import LoadingUi from 'components/loading/LoadingUI.svelte';
  import Body from 'components/typography/Body.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import { ApiRequestMethods } from 'types';
  import type { IHotel } from 'types/hotels.types';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import SearchBar from './components/SearchBar.svelte';

  let isLoading = true;
  let listOfHotels: IHotel[] = [];

  const getHotels = async () => {
    isLoading = true;
    const response = (await request({
      url: '/hotels/',
      method: ApiRequestMethods.get,
    })) as IHotel[];
    isLoading = false;
    console.log('response', response);
    listOfHotels = response?.map(item => {
      return {
        id: item.id,
        image_uri_id: item.image_uri_id,
        name: item.name,
        known_for: item.known_for,
        open_time: item.open_time,
        close_time: item.close_time,
        location: item.location,
        rating:
          item.rating &&
          (item.rating < 0
            ? 0
            : item.rating > 5
            ? 5
            : Number(Number(item.rating).toFixed(2))),
      };
    });
  };

  onMount(async () => await getHotels());
</script>

{#if isLoading}
  <LoadingUi />
{:else}
  <Box className="p-4 space-y-3 relative mb-8">
    <SearchBar />
    <Box>
      <Box flow="horizontal" align="center" className="py-2">
        <img class="w-4" src="icons/location.svg" alt="location" />
        <Body>Near by you</Body>
      </Box>

      <Box className="space-y-3 flex flex-col">
        {#each listOfHotels as item}
          <!-- <Restaurant hotelData={item} /> -->
          <RestaurantCard restaurantData={item} />
        {/each}
      </Box>
    </Box>
  </Box>
{/if}
