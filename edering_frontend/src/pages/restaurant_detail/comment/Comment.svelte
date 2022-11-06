<script lang="ts">
  import { params } from '@roxi/routify';
  import dayjs from 'dayjs';
  import { LoadingUI } from 'components';
  import Button from 'components/buttons/Button.svelte';
  import Box from 'components/layouts/Box.svelte';
  import Modal from 'components/modal/Container.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import { ApiRequestMethods, IComment } from 'types';

  $: console.log('params', $params);
  $: pId = $params.restaurant_id;
  let display = false;
  let index;
  let reviewInput = '';
  let comments: IComment[] = [];
  let isLoading = false;
  const arr = [1, 2, 3, 4, 5];

  $: console.log('review', reviewInput);

  const handleRatingStarClick = i => {
    index = i;
  };

  const handleReviewWithRating = () => {};

  onMount(async () => {
    isLoading = true;
    const response: IComment[] = await request({
      url: `/comments/?provider_id=${pId}`,
      method: ApiRequestMethods.get,
    });
    isLoading = false;
    if (response && response.length > 0) {
      comments = response;
    }
  });

  $: console.log('comments', comments);
</script>

<Modal {display} closeButtonSize="small" onModalClose={() => (display = false)}>
  <Box slot="form-section" className="p-6">
    <h2 class="text-sm text-black-primary">Provide Rating below...</h2>
    <Box className="pt-8">
      <div class="flex items-center">
        {#each arr as i}
          <svg
            name="star1"
            aria-hidden="true"
            on:click={() => handleRatingStarClick(i)}
            class="w-5 h-5  hover:text-yellow-primary {i <= index
              ? 'text-yellow-primary'
              : ''}"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>First star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
        {/each}
      </div>
      <Box>
        <Button on:click={handleReviewWithRating} size="small">Submit</Button>
      </Box>
    </Box>
  </Box>
</Modal>

{#if isLoading}
  <LoadingUI />
{:else}
  <Box className="pb-8 px-2 pt-3">
    <form on:submit|preventDefault={() => {}}>
      <textarea
        bind:value={reviewInput}
        class="bg-gray-primary h-16 text-sm  text-black-primary px-3 py-1 w-full  border-0 focus:placeholder-transparent focus:outline-none focus:ring-transparent"
        name="review"
        placeholder="Review here..."
      />
      <Box flow="horizontal" justify="end" className="pt-1">
        <Button
          on:click={() => (display = true)}
          size="small"
          type="filled"
          buttonEventType="submit">Add Rating</Button
        >
      </Box>
      {#if comments.length > 0}
        {#each comments as comment}
          <Box
            flow="horizontal"
            className="mt-4 bg-gray-primary p-1 rounded-xl text-black-primary"
          >
            <img
              src={comment.comment_from?.profile_image}
              class="mx-2 w-10 h-10 rounded-full"
              alt="user"
            />
            <Box className="pl-2 ">
              <h3 class="flex items-center font-bold">
                {comment.comment_from?.name || 'No name'}
                <span style="color: #ccc;" class=" font-bold text-xs ml-1"
                  >{dayjs(comment.created_at).format(
                    'MMM D, YYYY (hh:mm A)'
                  )}</span
                >
              </h3>
              <p class="text-xs">
                {comment.content}
              </p>
            </Box>
          </Box>
        {/each}
      {:else}
        <p>No comments</p>
      {/if}
    </form>
  </Box>
{/if}
