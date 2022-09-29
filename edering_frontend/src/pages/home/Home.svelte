<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import LoadingUi from 'components/loading/LoadingUI.svelte';
  import Body from 'components/typography/Body.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import { ApiRequestMethods } from 'types';
  import type { IHotel } from 'types/hotels.types';
  import HotelCard from './components/HotelCard.svelte';
  import SearchBar from './components/SearchBar.svelte';

  let isLoading = false;
  let listOfHotels: IHotel[] = [];

  const getHotels = async () => {
    isLoading = true;
    const response = (await request({
      url: '/hotels/',
      method: ApiRequestMethods.get,
    })) as IHotel[];
    isLoading = false;
    listOfHotels = response?.map(item => {
      return {
        id: item.id,
        image_uri_id: item.image_uri_id,
        name: item.name,
        known_for: item.known_for,
        open_time: item.open_time,
        close_time: item.close_time,
        location: item.location,
        rating: item.rating,
      };
    });
  };

  onMount(() => getHotels());
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
          <HotelCard hotelData={item} />
        {/each}
      </Box>
    </Box>
  </Box>
{/if}
