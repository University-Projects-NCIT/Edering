<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import Body from 'components/typography/Body.svelte';
  import type { IHotel } from 'types/hotels.types';

  export let hotelData: IHotel;
</script>

<a href={`detail/${hotelData.name}`}>
  <Box flow="horizontal" className="rounded-l-2xl">
    <Box className="flex w-2/5 rounded-l-2xl">
      <img src={hotelData.image_uri_id} alt="" class="rounded-l-2xl" />
    </Box>

    <Box className="bg-gray-primary rounded-r-2xl px-2  py-4 w-3/5 space-y-3">
      <h1 style="font-size: 0.7rem;" class="title leading-3 font-medium">
        {hotelData.name}
      </h1>

      <Box className="space-y-1">
        <Box flow="horizontal" align="center" className="space-x-1">
          <img class="w-3" src="/icons/location.svg" alt="" />
          <Body
            style="font-size: 0.6rem; line-height: 0.6rem"
            className="location-name"
          >
            {hotelData.location}</Body
          >
        </Box>

        <Box flow="horizontal" align="center" className="space-x-1 ml-icon">
          <img class="w-2" src="/icons/time.svg" alt="" />
          <Body style="font-size: 0.6rem; line-height: 0.6rem" className="time">
            {hotelData.open_time} - {hotelData.close_time}</Body
          >
        </Box>

        <Box flow="horizontal" className="ml-icon" />
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

    :global(.time) {
      font-size: 0.8rem !important;
      line-height: 1rem !important;
    }
  }

  :global(.ml-icon) {
    margin-left: 0.1rem;
  }
</style>
