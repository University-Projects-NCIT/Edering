<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Home from 'pages/home/Home.svelte';
  import RestaurantDetailPage from 'pages/restaurant_detail/RestaurantDetail.svelte';
  import {
    restaurantDetailRoute,
    RestaurantDetailTab,
  } from 'pages/restaurant_detail/restaurantRoute';
  import { userType, user_store } from 'store';

  // export let id;
  // $: restaurantId = $params?.id;
  // $: console.log('iddd', restaurantId); //hotel id
  $: console.log('paramas', $params); //hotel id
  $: restaurantId = $params?.restaurant_id;

  $: console.log('usertype', $userType);

  if ($userType === 'Provider') {
    $goto(
      `${restaurantDetailRoute.getRoute({
        restaurantId: $user_store.id,
        tab: RestaurantDetailTab.Menu,
      })}`
    );
  }
</script>

{#if restaurantId}
  <RestaurantDetailPage />
{:else}
  <Home />
{/if}
