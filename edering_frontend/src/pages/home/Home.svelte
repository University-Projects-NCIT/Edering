<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import LoadingUi from 'components/loading/LoadingUI.svelte';
  import Body from 'components/typography/Body.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import {
    ApiRequestMethods,
    IListOfResturants,
    IProvider,
    IRating,
  } from 'types';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import SearchBar from './components/SearchBar.svelte';

  let isLoading = true;
  let listOfRestaurants: IListOfResturants[] = [];
  $: console.log('listofrestaurants', listOfRestaurants);

  const calculateRating = (ratings: IRating[]) => {
    const noOfRatings = ratings.length;
    let avgRating = 0;
    if (noOfRatings > 0) {
      ratings.map(item => {
        avgRating += Number(item.rating);
      });
    }
    return Number((avgRating / noOfRatings).toFixed(2));
  };

  const getRestaurants = async () => {
    isLoading = true;
    const response = (await request({
      url: '/providers',
      method: ApiRequestMethods.get,
    })) as IProvider[];
    isLoading = false;
    console.log('response', response);
    if (response && (response.length ?? 0) > 0)
      listOfRestaurants = response?.map(item => {
        return {
          id: item.id,
          imageId: item.image_id,
          name: item.name,
          knownFor: item.known_for,
          openTime: item.open_time,
          closeTime: item.close_time,
          location: item.location,
          rating: calculateRating(item.ratings ?? []),
        };
      });
  };

  onMount(async () => await getRestaurants());
</script>

{#if listOfRestaurants && listOfRestaurants.length > 0}
  <Box className="p-4 space-y-3 relative mb-8">
    <SearchBar />
    <Box>
      <!-- <Box flow="horizontal" align="center" className="py-2">
        <img class="w-4" src="icons/location.svg" alt="location" />
        <Body>Near by you</Body>
      </Box> -->
      <Box className="space-y-3 flex flex-col">
        {#each listOfRestaurants as item}
          <!-- <Restaurant hotelData={item} /> -->
          <RestaurantCard restaurantData={item} />
        {/each}
      </Box>
    </Box>
  </Box>
{:else}
  <LoadingUi />
{/if}
