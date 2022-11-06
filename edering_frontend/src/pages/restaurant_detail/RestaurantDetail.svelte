<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import LoadingUI from 'components/loading/LoadingUI.svelte';
  import { calculateRating, request } from 'helper';
  import Chat from 'pages/restaurant_detail/chat/Chat.svelte';
  import RestaurantCard from 'pages/home/components/RestaurantCard.svelte';
  import { onMount } from 'svelte';
  import MenuPage from './components/MenuPage.svelte';
  import TabsMainPage from './components/TabsMainPage.svelte';
  import TopNav from './components/TopNav.svelte';
  import { RestaurantDetailTab } from './restaurantRoute';
  import About from './about/About.svelte';
  import type { IListOfResturants, IProvider } from 'types';
  import { userType, user_store } from 'store';
  import Review from './review/Review.svelte';

  $: restaurantId = $params?.restaurant_id;
  $: activeTab = $params?.active_tab;
  let isLoading = true;
  let restaurant: IListOfResturants;

  const onClickChatBtn = () => {
    $goto(`/chat/?senderId=${$user_store.id}&&receiverId=${restaurantId}`);
  };

  onMount(async () => {
    if (!restaurantId) {
      alert('no restaurant id');
      return;
    }
    isLoading = true;
    const response = (await request({
      url: `/providers/?id=${restaurantId}`,
    })) as IProvider[];
    console.log('restaurantDetail', response);
    isLoading = false;
    if (!response[0]) return;
    const {
      id,
      close_time,
      image_id,
      open_time,
      name,
      location,
      known_for,
      ratings,
    } = response[0];
    restaurant = {
      id,
      closeTime: close_time,
      imageId: image_id,
      knownFor: known_for,
      location: location,
      name: name,
      openTime: open_time,
      rating: calculateRating(ratings ?? []),
    };
  });
</script>

{#if restaurant}
  <Box className="pb-20">
    {#if $userType == 'Customer'}
      <Box className="fixed bottom-14 right-4">
        <img on:click={onClickChatBtn} src={'/icons/chatBtn.svg'} alt="" />
      </Box>
    {/if}
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
      <TabsMainPage displayPage={RestaurantDetailTab.Menu}>
        <MenuPage {restaurantId} />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.About}>
        <About {restaurant} />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.Chat}>
        <Chat />
      </TabsMainPage>
      <TabsMainPage displayPage={RestaurantDetailTab.Review}>
        <Review />
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
