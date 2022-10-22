<script lang="ts">
  import { params } from '@roxi/routify';
  import Home from 'pages/home/Home.svelte';
  import RestaurantDetailPage from 'pages/restaurant_detail/RestaurantDetail.svelte';

  // export let id;
  // $: restaurantId = $params?.id;
  // $: console.log('iddd', restaurantId); //hotel id
  $: console.log('paramas', $params); //hotel id
  $: restaurantId = $params?.restaurant_id;
</script>

{#if restaurantId}
  <RestaurantDetailPage />
{:else}
  <Home />
{/if}
