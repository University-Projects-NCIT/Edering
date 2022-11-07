<script lang="ts">
  import { params } from '@roxi/routify';
  import { RestaurantDetailTab } from '../restaurantRoute';

  export let displayPage: RestaurantDetailTab = RestaurantDetailTab.Menu;
  $: activeTab = $params?.active_tab ?? RestaurantDetailTab.Menu;
  $: console.log('active', activeTab);
</script>

{#if activeTab?.toUpperCase() === displayPage}
  <slot />
{/if}
