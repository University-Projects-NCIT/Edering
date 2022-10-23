<script lang="ts">
  import { params } from '@roxi/routify';
  import { RestaurantDetailTab } from '../restaurantRoute';

  export let displayPage: RestaurantDetailTab = RestaurantDetailTab.Menu;
  $: activeTab = $params?.active_tab as string;
</script>

{#if activeTab.toUpperCase() === displayPage}
  <slot />
{/if}
