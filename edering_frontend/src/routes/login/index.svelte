<script lang="ts">
  import { goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { authState } from 'rxfire/auth';
  import { auth, googleProvider } from 'config/conn_firebase';
  import type { User } from 'types';
  import { user_store } from 'store';
  import { signInWithPopup } from 'firebase/auth';

  export let userType: 'Provider' | 'Customer' = 'Customer';

  let _selectedUser = 'Provider';

  let userProfile: User;
  const userStore = user_store.subscribe((value: User) => {
    userProfile = value;
    console.log(userProfile);
  });

  // const auth = firebase.auth();
  // const googleProvider = new firebase.auth.GoogleAuthProvider();

  const unsubscribe = authState(auth).subscribe(user => {
    console.log(user);

    const result = {
      id: user?.uid ?? '',
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      type: _selectedUser,
      imageUrl: user?.photoURL ?? '',
    };
    user_store.set(result);
  });

  function login() {
    signInWithPopup(auth, googleProvider);
  }

  function logout() {
    auth.signOut();
  }

  // when you load or reload the page
  auth.onAuthStateChanged(auth => {
    // if user is not logged in the auth will be null
    if (auth) {
      console.log('logged in');
    } else {
      console.log('not logged in');
    }
  });
</script>

<Box
  className="min-h-screen w-screen bg-[url('/icons/login_back4.svg')] bg-cover "
>
  <div class="pt-8">
    <div class="flex items-center justify-center mb-10">
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
      class="mt-4 content-center border-2 border-black-primary
     flex items-center justify-center h-10 max-w-md mx-8
     rounded-full text-center"
      on:click={login}
    >
      <img class="w-5 mr-4" src={'/icons/google.svg'} alt="" />
      <p class="text-black-primary">Login with google</p>
    </div>

    <button class="p-4 bg-blue-400" on:click={() => $goto('/chat')}
      >Profile</button
    >

    {#if userProfile.id}
      <div>{userProfile.name}</div>
      <div class="text-red-500 " on:click={logout}>Logout</div>
    {:else}
      <div>User not login</div>
    {/if}
  </div>
</Box>

<style>
</style>
