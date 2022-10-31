<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import LoadingUi from 'components/loading/LoadingUI.svelte';
  import Body from 'components/typography/Body.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import {
    ApiRequestMethods,
    HTMLInput,
    IListOfResturants,
    IProvider,
    IRating,
  } from 'types';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import SearchBar from './components/SearchBar.svelte';

  let isLoading = true;
  let searchValue = '';
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

  const getRestaurants = async ({ searchAction = false }) => {
    isLoading = true;
    if (!searchValue) searchAction = false;
    let url = `/providers/${searchAction ? `?search=${searchValue}` : ''}`;
    const response = (await request({
      url,
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

  const handleInput = (e: HTMLInput) => {
    const { value } = e.currentTarget;
    searchValue = value;
  };

  const handleSearchSubmit = () => {
    console.log('searchValue', searchValue);
    if (isLoading) return;
    listOfRestaurants = [];
    getRestaurants({ searchAction: true });
  };

  onMount(async () => await getRestaurants({ searchAction: false }));
</script>

<Box className="p-4 space-y-3 relative mb-8">
  <SearchBar value={searchValue} {handleSearchSubmit} {handleInput} />
  {#if isLoading}
    <LoadingUi />
  {:else if listOfRestaurants && listOfRestaurants.length > 0}
    <Box>
      <Box className="space-y-3 flex flex-col">
        {#each listOfRestaurants as item}
          <!-- <Restaurant hotelData={item} /> -->
          <RestaurantCard restaurantData={item} />
        {/each}
      </Box>
    </Box>
  {/if}
</Box>
