<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import Body from 'components/typography/Body.svelte';
  import type { IHotel } from 'types/hotels.types';
  import StarRating from 'svelte-star-rating';
  import { url } from '@roxi/routify';
  import {
    restaurantDetailRoute,
    RestaurantDetailTab,
  } from 'pages/restaurant_detail/restaurantRoute';

  export let restaurantData: IHotel;
  $: console.log('iddddddd', restaurantData.id);
</script>

<a
  href={$url(
    `${restaurantDetailRoute.getRoute({
      restaurantId: restaurantData.id || '',
      tab: RestaurantDetailTab.Menu,
    })}`
  )}
>
  <Box flow="horizontal" className="rounded-l-2xl">
    <Box className="flex w-2/5 rounded-l-2xl">
      <img src={restaurantData.image_uri_id} alt="" class="rounded-l-2xl" />
    </Box>

    <Box className="bg-gray-primary rounded-r-2xl px-2  py-4 w-3/5 space-y-3">
      <Box flow="horizontal" justify="between">
        <h1 style="font-size: 0.7rem;" class="title leading-3 font-medium">
          {restaurantData.name}
        </h1>
        <span class="text-yellow-primary font-medium" style="font-size: 0.7rem"
          >{restaurantData.rating}/5</span
        >
      </Box>

      <Box className="space-y-1">
        <Box flow="horizontal" align="center" className="space-x-1">
          <img class="w-3" src="/icons/location.svg" alt="" />
          <Body
            style="font-size: 0.6rem; line-height: 0.6rem"
            className="location-name"
          >
            {restaurantData.location}</Body
          >
        </Box>

        <Box flow="horizontal" align="center" className="space-x-1 ml-icon">
          <img class="w-2" src="/icons/time.svg" alt="" />
          <Body style="font-size: 0.6rem; line-height: 0.6rem" className="time">
            {restaurantData.open_time} - {restaurantData.close_time}</Body
          >
        </Box>

        <Box flow="horizontal" align="center" className="ml-icon space-x-1">
          <img class="w-2" src="/icons/famous.svg" alt="" />
          <Body className="famous">{restaurantData.known_for}</Body>
        </Box>

        <Box className="ml-icon">
          <StarRating
            rating={restaurantData.rating ?? 0}
            config={{ size: 10, fullColor: '#FFA800' }}
          />
        </Box>
      </Box>
    </Box>
  </Box>
</a>

<style>
  @media (min-width: 330px) {
    .title {
      font-size: 1rem !important;
      line-height: 1.2rem !important;
    }

    :global(.location-name) {
      font-size: 0.8rem !important;
      line-height: 1rem !important;
    }

    :global(.time, .famous) {
      font-size: 0.8rem !important;
      line-height: 1rem !important;
    }
  }

  :global(.ml-icon) {
    margin-left: 0.1rem;
  }

  :global(.famous) {
    font-size: 0.6rem;
    line-height: 0.6rem;
  }
</style>
