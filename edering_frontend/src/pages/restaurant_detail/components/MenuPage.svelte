<script lang="ts">
  import LoadingUI from 'components/loading/LoadingUI.svelte';
  import Input from 'components/input_components/Input.svelte';
  import Box from 'components/layouts/Box.svelte';
  // import Modal from '../../../components/modal/Container.svelte'

  import Modal from 'components/modal/Container.svelte';

  import { request } from 'helper';
  import type { IFoodCategory } from 'types';
  import { ApiRequestMethods } from 'types';
  import { onMount } from 'svelte';
  import { userType } from 'store';
  import type { UserType } from 'types/UserType';
  import { async } from 'rxjs';
  import BarLoading from 'components/loading/BarLoading.svelte';
  import Button from 'components/buttons/Button.svelte';

  export let restaurantId;
  let whoIsUser: UserType;
  $: whoIsUser = $userType;
  let isLoading = false;
  let display = false;
  let removeItemId;
  let isRemoving = false;

  let foodCategories: IFoodCategory[] = [];

  const handleRemove = async () => {
    isRemoving = true;
    const response: IFoodCategory[] = await request({
      url: `/food_categories/${removeItemId}/`,
      method: ApiRequestMethods.delete,
      data: {},
    });
    // if (response && (response.length ?? 0) > 0) {
    //   foodCategories = response;
    //   console.log('restaurantDetail', response);
    // }
    isRemoving = false;
    await getFoodCategories();
    display = false;
  };

  const handleRemoveCategory = async id => {
    // remove
    removeItemId = id;
    console.log('removeitemid', removeItemId);
    display = true;
  };

  const getFoodCategories = async () => {
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
    } else {
      foodCategories = [];
    }
  };

  onMount(async () => {
    await getFoodCategories();
  });
</script>

<Modal {display} closeButtonSize="small" onModalClose={() => (display = false)}>
  <Box slot="form-section" className="p-6">
    <h2 class="text-sm text-black-primary">Are you sure you want to remove?</h2>
    <Box justify="around" className="pt-8">
      <BarLoading isLoading={isRemoving}>
        <Button
          size="small"
          label="Yes"
          on:click={handleRemove}
          variant="secondary"
          type="filled"
        />
        <Button
          on:click={() => (display = false)}
          size="small"
          label="No"
          variant="primary"
          type="filled"
        />
      </BarLoading>
    </Box>
  </Box>
</Modal>

<Box className="mt-3">
  <Input placeholder="Search foods..." />
</Box>

<Box className="flex mt-2 justify-between">
  <Box>
    <h3 class="text-base text-black-primary font-bold">Eatme</h3>
    <Box
      className="rounded-full bg-yellow-primary mt-1"
      style="width: 0.4rem; height: 0.4rem;"
    />
  </Box>
  {#if whoIsUser == 'Provider'}
    <Box>
      <a
        style="text-decoration: underline;"
        class="hover:text-yellow-primary text-black-primary text-xs"
        href="/add-foodcategory">Add Food Category</a
      >
    </Box>
  {/if}
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
      <Box>
        {#if whoIsUser == 'Provider'}
          <Box className="hover:bg-yellow-primary w-fit close-icon p-1">
            <img
              class="w-3"
              on:click={() => handleRemoveCategory(category.id)}
              src="/icons/close-icon.svg"
              alt=""
            />
          </Box>
        {/if}

        <a href="/menu?p_id={category.provider}">
          <Box
            className="bg-gray-primary rounded-3xl p-4 text-center hover:cursor-pointer food-category"
          >
            <img class="w-20 h-16 rounded-2xl" src={category.image_id} alt="" />
            <p class="text-xs text-black-primary font-medium">
              {category?.c_name}
            </p>
          </Box>
        </a>
      </Box>
    {/each}
  </Box>
{:else}
  <p class="text-center">No data found</p>
{/if}

<style>
  :global(.close-icon) {
    position: relative;
    left: 93px;
  }
</style>
