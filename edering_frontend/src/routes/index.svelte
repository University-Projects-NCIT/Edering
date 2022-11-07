<script lang="ts">
  import { goto } from '@roxi/routify';
  import {
    restaurantDetailRoute,
    RestaurantDetailTab,
  } from 'pages/restaurant_detail/restaurantRoute';
  import { userType, user_store } from 'store';
  import { onMount } from 'svelte/types/runtime/internal/lifecycle';

  // import HomePage from 'pages/home/Home.svelte';

  // onMount(async () => {
  //   let res = await request<IUserData>({
  //     url: '/customers/',
  //     method: ApiRequestMethods.post,
  //     data: {
  //       id: '123',
  //       auth_id: '123456789',
  //     },
  //   });
  //   console.log('res', res);
  // });

  // const apiCall = async () => {
  //   // const response = await request<IUserData>({
  //   //   url: '/customers/',
  //   //   method: ApiRequestMethods.post,
  //   //   data: {
  //   //     id: '64',
  //   //     auth_id: '89',
  //   //   },
  //   // });

  //   const response = (await request({
  //     url: '/hotels/',
  //     method: ApiRequestMethods.get,
  //   })) as IHotels[];

  //   console.log('response', response);
  // };

  $goto('/restaurant');
</script>

<!-- <button on:click={() => apiCall()}>Post</button> -->
<!-- <HomePage /> -->
