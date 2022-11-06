<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { capitalizeFirstLetter } from 'helper';
  import {
    restaurantDetailRoute,
    RestaurantDetailTab,
  } from '../restaurantRoute';

  const navItems: RestaurantDetailTab[] = [
    RestaurantDetailTab.Menu,
    RestaurantDetailTab.About,
    RestaurantDetailTab.Chat,
    RestaurantDetailTab.Review,
  ];

  $: activeTab = $params?.active_tab as string;
  $: restaurantId = $params?.restaurant_id;

  const handleTabClick = tab => {
    $goto(restaurantDetailRoute.getRoute({ restaurantId, tab }));
  };
</script>

<Box flow="horizontal" align="center" justify="between">
  {#each navItems as item}
    <Box
      onClick={() => handleTabClick(item)}
      className="rounded-xl border border-gray-primary py-2 px-4 {item ===
      activeTab.toUpperCase()
        ? 'border-yellow-primary'
        : ''}"
    >
      <p style="font-size: 0.6rem; line-height: 0.6rem">
        {capitalizeFirstLetter(item)}
      </p>
    </Box>
  {/each}
  <!-- {:else} -->
  <!-- {#each foodCategories ?? [] as category}
      <Box
        className="rounded-xl bg-gray-primary py-2 px-4 {category?.id ===
        foodCategories?.[0]?.id
          ? 'bg-yellow-primary text-white'
          : ''}"
      >
        <p style="font-size: 0.6rem; line-height: 0.6rem">
          {category?.c_name}
        </p>
      </Box>
    {/each} -->
</Box>
