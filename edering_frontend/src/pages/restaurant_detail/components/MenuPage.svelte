<script lang="ts">
  import LoadingUI from 'components/loading/LoadingUI.svelte';
  import Input from 'components/input_components/Input.svelte';
  import Box from 'components/layouts/Box.svelte';
  import { request } from 'helper';
  import type { IFoodCategory } from 'types';
  import { ApiRequestMethods } from 'types';
  import { onMount } from 'svelte';

  export let restaurantId;
  let isLoading = false;

  let foodCategories: IFoodCategory[] = [];

  onMount(async () => {
    if (!restaurantId) {
      alert('no restaurant id');
      return;
    }
    isLoading = true;
    const response: IFoodCategory[] = await request({
      url: `/food_categories/?provider_id=${restaurantId}`,
      method: ApiRequestMethods.get,
    });
    isLoading = false;
    if (response && (response.length ?? 0) > 0) {
      foodCategories = response;
      console.log('restaurantDetail', response);
    }
  });
</script>

<Box className="mt-3">
  <Input placeholder="Search foods..." />
</Box>

<Box className="flex mt-2">
  <h3 class="text-base text-black-primary font-bold">Eatme</h3>
  <Box
    className="rounded-full bg-yellow-primary mt-1"
    style="width: 0.4rem; height: 0.4rem;"
  />
</Box>

{#if isLoading}
  <LoadingUI />
{:else if foodCategories.length > 0}
  <Box
    flow="horizontal"
    justify="center"
    align="center"
    className="flex-wrap gap-4 mt-4"
  >
    <!-- food categories list -->
    {#each foodCategories as category}
      <a href="/menu?c_id={category.id}">
        <Box
          className="bg-gray-primary rounded-3xl p-4 text-center hover:cursor-pointer food-category"
        >
          <img class="w-20 h-16 rounded-2xl" src={category.image_id} alt="" />
          <p class="text-xs text-black-primary font-medium">
            {category?.c_name}
          </p>
        </Box>
      </a>
    {/each}
  </Box>
{:else}
  <p class="text-center">No data found</p>
{/if}
