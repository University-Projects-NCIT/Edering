<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import type { IFoodCategory } from 'types/foodCategory.types';

  type NavType = 'top' | 'foodCategory';
  export let navType: NavType = 'top';
  export let navItems: string[] | undefined = undefined;
  export let foodCategories: IFoodCategory[] | undefined = undefined;
</script>

<Box flow="horizontal" align="center" justify="between">
  {#if navType === 'top'}
    {#each navItems ?? [] as item}
      <Box
        className="rounded-xl border border-gray-primary py-2 px-4 {item ===
        navItems?.[0]
          ? 'border-yellow-primary'
          : ''}"
      >
        <p style="font-size: 0.6rem; line-height: 0.6rem">
          {item}
        </p>
      </Box>
    {/each}
  {:else}
    {#each foodCategories ?? [] as category}
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
    {/each}
  {/if}
</Box>
