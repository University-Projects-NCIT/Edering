<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  export let userType: 'Provider' | 'Customer' = 'Customer';

  // let selectedUser = "Provider"

  // two type use customer and provider
</script>

<Box
  className="min-h-screen w-screen bg-[url('/icons/login_back4.svg')] bg-cover "
>
  <div class="pt-8">
    <div class="flex items-center justify-center mb-6">
      <div class="h-6 w-1/4 bg-[url('/icons/edering.png')] bg-cover" />
    </div>

    <div
      class="content-center border-2 border-color1-blueText
     flex items-center justify-center h-10 max-w-md mx-8 hover: bg-color1-orange1
     rounded-full text-center"
    >
      <p class="text-color1-blueText">Login as a {userType}</p>
    </div>

    <div
      class="mt-4 content-center border-2 border-color1-green1
     flex items-center justify-center h-10 max-w-md mx-8
     rounded-full text-center"
    >
      <p class="text-color1-green1">Login as a Provider</p>
    </div>

    <div class="flex items-center justify-center mt-10">
      <div class="w-40 h-40 bg-[url('/icons/placeholder.png')] bg-cover" />
    </div>

    <div
      class="mt-4 content-center border-2 border-color1-green1
     flex items-center justify-center h-10 max-w-md mx-8
     rounded-full text-center"
    >
      <p class="text-color1-green1">Login with google</p>
    </div>
  </div>
</Box>

<style>
</style>
