<script lang="ts">
  import { request } from 'helper/request';

  import HomePage from 'pages/home/Home.svelte';
  // import { onMount } from 'svelte';
  import { ApiRequestMethods, IUserData } from 'types';

  // onMount(async () => {
  //   let res = await request<IUserData>({
  //     url: '/customers/',
  //     method: ApiRequestMethods.post,
  //     data: {
  //       id: '123',
  //       auth_id: '123456789',
  //     },
  //   });
  //   console.log('res', res);
  // });

  const apiCall = async () => {
    const response = await request<IUserData>({
      url: '/customers/',
      method: ApiRequestMethods.post,
      data: {
        id: '64',
        auth_id: '89',
      },
    });

    console.log('response', response);
  };
</script>

<button on:click={() => apiCall()}>Post</button>
<HomePage />
