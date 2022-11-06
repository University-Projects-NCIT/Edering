<script lang="ts">
  import { params } from '@roxi/routify';
  import dayjs from 'dayjs';
  import { LoadingUI } from 'components';
  import Button from 'components/buttons/Button.svelte';
  import Box from 'components/layouts/Box.svelte';
  import Modal from 'components/modal/Container.svelte';
  import { request } from 'helper';
  import { onMount } from 'svelte';
  import { ApiRequestMethods, IComment, IRating } from 'types';
  import { user_store } from 'store';
  import StarRating from 'svelte-star-rating';

  $: console.log('params', $params);
  $: pId = $params.restaurant_id;
  let display = false;
  let index;
  let reviewInput = '';
  let comments: IComment[] = [];
  let ratings: IRating[] = [];
  let isLoading = false;
  const arr = [1, 2, 3, 4, 5];

  $: console.log('review', reviewInput);

  const handleRatingStarClick = i => {
    index = i;
  };

  const postReview = async () => {
    // review
    const response = await request<IComment>({
      url: '/comments/',
      method: ApiRequestMethods.post,
      data: {
        id: 'adf',
        content: reviewInput,
        comment_from: {
          id: $user_store.id,
        },
        comment_to: {
          id: pId,
        },
      },
    });

    console.log('postreviewresponse', response);
  };

  const postRating = async () => {
    // rating
  };

  const handleReviewWithRating = async () => {
    await postReview();
    await postRating();
  };

  interface IRatingWithReviewData {
    name?: string;
    rating?: string;
    img_url?: string;
    reviewText?: string;
    reviewerId?: string;
    reviewDate?: string;
  }

  let ratingWithReviewData: IRatingWithReviewData[] = [];

  const prepareRatingWithReviewData = () => {
    ratingWithReviewData = comments.map(comment => {
      return {
        name: comment.comment_from?.name,
        img_url: comment.comment_from?.profile_image,
        reviewText: comment.content,
        reviewerId: comment.comment_from?.id,
        reviewDate: comment.created_at,
      };
    });

    ratings.map(rating => {
      if (ratingWithReviewData.length > 0) {
        ratingWithReviewData.forEach((item, i) => {
          if (item.reviewerId === rating.rating_from?.id) {
            ratingWithReviewData[i].rating = rating.rating;
          }
        });
      }
    });
  };

  $: console.log('ratingwithreviewdata', ratingWithReviewData);

  onMount(async () => {
    isLoading = true;
    const response: IComment[] = await request({
      url: `/comments/?provider_id=${pId}`,
      method: ApiRequestMethods.get,
    });

    const ratingResponse: IRating[] = await request({
      url: `/ratings/?provider_id=${pId}`,
      method: ApiRequestMethods.get,
    });

    if (response && response.length > 0) {
      comments = response;
      console.log('commeenntts', comments);
    }
    if (ratingResponse && ratingResponse.length > 0) {
      ratings = ratingResponse;
      console.log('ratingssss', ratings);
    }

    prepareRatingWithReviewData();
    isLoading = false;
  });

  $: console.log('comments', comments);

  $: console.log('userstre', $user_store);
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
          on:click={() => {
            display = true;
          }}
          size="small"
          type="filled"
          buttonEventType="submit">Add Rating</Button
        >
      </Box>
      {#if ratingWithReviewData.length > 0}
        {#each ratingWithReviewData as data}
          <Box
            flow="horizontal"
            className="mt-4 bg-gray-primary p-2 rounded-xl text-black-primary"
          >
            <img
              src={data.img_url || '/icons/user.svg'}
              class="h-8 rounded-full"
              alt="user"
            />
            <Box className="pl-2 ">
              <h3 class="flex items-center font-bold">
                {data.name?.split(' ')[0] || 'Unknown'}
                <span style="color: #aba9a9;" class=" font-bold text-xs ml-1"
                  >{dayjs(data.reviewDate).format(
                    'MMM D, YYYY (hh:mm A)'
                  )}</span
                >
              </h3>
              <Box>
                <StarRating
                  config={{ size: 10, fullColor: '#FFA800' }}
                  rating={Number(data.rating ?? 0)}
                />
              </Box>
              <p class="text-xs">
                {data.reviewText}
              </p>
            </Box>
          </Box>
        {/each}
      {:else}
        <p class="text-center mt-4 text-yellow-primary">No Review Found...</p>
      {/if}
    </form>
  </Box>
{/if}
