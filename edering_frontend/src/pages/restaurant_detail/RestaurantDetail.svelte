<script lang="ts">
  import { params } from '@roxi/routify';
  import Input from 'components/input_components/Input.svelte';
  import Box from 'components/layouts/Box.svelte';
  import LoadingUI from 'components/loading/LoadingUI.svelte';
  import { request } from 'helper';
  import Chat from 'pages/restaurant_detail/chat/Chat.svelte';
  import RestaurantCard from 'pages/home/components/RestaurantCard.svelte';
  import { onMount } from 'svelte';
  import type { IHotel } from 'types';
  import type { IFoodCategory } from 'types/foodCategory.types';
  import Comment from './comment/Comment.svelte';
  import MenuPage from './components/MenuPage.svelte';
  import TabsMainPage from './components/TabsMainPage.svelte';
  import TopNav from './components/TopNav.svelte';
  import { RestaurantDetailTab } from './restaurantRoute';
  import About from './about/About.svelte';

  $: restaurantId = $params?.restaurant_id;
  $: activeTab = $params?.active_tab;
  let isLoading = true;
  let restaurant: IHotel;

  onMount(async () => {
    if (!restaurantId) {
      alert('no restaurant id');
      return;
    }
    isLoading = true;
    const response = await request({
      url: `/hotels/?hotel_id=${restaurantId}`,
    });
    console.log('restaurantDetail', response);
    isLoading = false;
    if (!response[0]) return;
    restaurant = response[0];
  });
</script>

{#if restaurant}
  <Box className="pb-20">
    <!-- <img class="banner-img w-full" src={restaurant.image_uri_id} alt="" /> -->
    <Box className="p-2">
      <RestaurantCard restaurantData={restaurant} />
    </Box>
    <!-- detail container -->
    <Box className="px-2">
      <!-- //topnav -->
      <Box className="mt-2">
        <TopNav />
      </Box>
      <!-- //search bar -->
      <TabsMainPage displayPage={RestaurantDetailTab.Menu}>
        <MenuPage />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.About}>
        <About />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.Chat}>
        <Chat />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.Comment}>
        <Comment />
      </TabsMainPage>
    </Box>
  </Box>
{:else}
  <LoadingUI />
{/if}

<style>
  /* .banner-img {
    aspect-ratio: 2/1;
  } */

  :global(.food-category:hover p) {
    color: #ffa800;
  }
</style>
