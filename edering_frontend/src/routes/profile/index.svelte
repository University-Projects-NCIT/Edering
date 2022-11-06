<script lang="ts">
  import { goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { authState } from 'rxfire/auth';
  import { auth, googleProvider } from 'config/conn_firebase';
  import { ApiRequestMethods, IUser } from 'types';
  import { user_store, provider, customer, providerForm } from 'store';
  import { signInWithPopup } from 'firebase/auth';
  import { request } from 'helper';
  import { userType } from 'store/usertype.store';
  import type { ICustomer, IProvider } from 'types';
  import Profile from '../../pages/profile/Profile.svelte';
  import ProviderForm from '../login/components/ProviderForm.svelte';
  import { onMount } from 'svelte';
  import { getProvider, getCustomer} from '../../helper/dataRepository'
  import CustomerProfile from 'pages/profile/CustomerProfile.svelte';
  import ProviderProfile from 'pages/profile/ProviderProfile.svelte';

  let showPrvForm = false;

  const unsubscribe = authState(auth).subscribe(user => {
    if(user?.uid != null){
      getCustomer(user.uid).then(data => {
        if(Object.keys(data).length != 0) {
          customer.set(data)
          if($userType == 'None'){
            userType.set('Customer')
          }
        }
      });
      getProvider(user.uid).then(data => {
        if(Object.keys(data).length != 0){
          provider.set(data)
          if($userType == 'None'){
            userType.set('Provider')
          }
        }
      });
      const result = {
        id: user?.uid ?? '',
        name: user?.displayName ?? '',
        email: user?.email ?? '',
        type: $userType,
        imageUrl: user?.photoURL ?? '',
      };
      user_store.set(result);
    }
  });

  function login() {
    signInWithPopup(auth, googleProvider);
  }

  function logout() {
    auth.signOut();
    customer.set({ id: '' });
    provider.set({
      id: '',
      name: '',
      location: '',
      image_id: '',
      known_for: '',
      open_time: '',
      close_time: '',
      created_at: '',
    });
    showPrvForm = false;
  }

  const updatePrv = async () => {
    const userId = $user_store.id;
    const prvUrl = `/providers/?id=${userId}`;

    const updatedProvider: IProvider = {
      id: userId,
      name: $providerForm.name,
      location: $providerForm.location,
      image_id: $providerForm.image_id,
      known_for: $providerForm.known_for,
      open_time: $providerForm.open_time,
      close_time: $providerForm.close_time,
      created_at: `${Date.now()}`,
    };

    await request<IProvider>({
      url: prvUrl,
      method: ApiRequestMethods.post,
      data: updatedProvider,
    }).then(data => {
      if(Object.keys(data).length != 0){
        if(Object.keys(data).length != 0){
            getProvider(userId).then( data => {
              provider.set(data)
              showPrvForm = false;
            })
          }
        }
    });
  };

  const updateCst = async () => {
    const userId = $user_store.id;
    const cstUrl = `/customers/?id=${userId}`;

    const updatedCustomer: ICustomer = {
      id: userId,
      name: $user_store.name,
      email: $user_store.email,
      profile_image: $user_store.imageUrl
    };

    request<ICustomer>({ url: cstUrl }).then(res => {
      if (res.length == 0 && userId) {
        request({
          url: cstUrl,
          method: ApiRequestMethods.post,
          data: updatedCustomer,
        }).then(data => {
          if(Object.keys(data).length != 0){
            getCustomer(userId).then( data => {
              customer.set(data)
            })
          }
        })
      }
    });
  };

  // when you load or reload the page
  auth.onAuthStateChanged(async auth => {
    console.log("User Type",$userType)
    if ($userType == 'Provider') {
      getProvider($user_store.id).then( data => {
        if(Object.keys(data).length != 0){
          provider.set(data)
        }
      })
    }
    if ($userType == 'Customer') {
      getCustomer($user_store.id).then( data => {
        if(Object.keys(data).length != 0){
          customer.set(data)
        }
      })
    }
    if (auth) {
      console.log('Loged in');
      console.log("UserType==", $userType)
      if ($userType == 'Customer') {
        updateCst();
      }
      if ($userType == 'Provider') {
        if ($provider.id == '') {
          showPrvForm = true;
        }
      }
    } else {
      console.log('not logged in');
    }
  });

</script>

<Box>
  {#if $customer.id != '' && $userType == 'Customer'}
    <Box>
      <CustomerProfile onLogout={logout}/>
    </Box>
  {:else if $provider.id != '' && $userType == 'Provider'}
    <Box>
      <ProviderProfile/>
    </Box>
  {:else if showPrvForm}
    <Box>
      <ProviderForm {updatePrv} />
    </Box>
  {:else}
    <Box
      className="min-h-screen w-screen bg-[url('/icons/login_back4.svg')] bg-cover "
    >
      <Box className="pt-8">
        <Box className="flex items-center justify-center mb-6 p-2">
          <img class="py-4 px-2" src = {'/icons/edering.png'} alt = "logo"/>
        </Box>

        <Box 
          onClick={() => {
            userType.set('Customer');
          }}
          className="{ $userType == 'Customer'
            ? 'bg-color1-orange1'
            : 'bg-transparent'
          }
          border-color1-blueText flex items-center justify-center h-10 max-w-md mx-8
            rounded-full text-center content-center border-2">
          <p class="text-color1-blueText">Login as a Customer</p>
        </Box>

        <Box
          onClick={() => {
            userType.set('Provider');
          }}
          className="mt-4 content-center border-2 {$userType == 'Provider'
            ? 'bg-color1-orange1'
            : 'bg-transparent'}
          border-color1-green1 flex items-center justify-center h-10 max-w-md mx-8
            rounded-full text-center"
        >
          <p class="text-color1-green1">Login as a Provider</p>
        </Box>

        <Box className="flex items-center justify-center mt-10">
          <Box className="w-40 h-40 bg-[url('/icons/placeholder.png')] bg-cover" />
        </Box>
        <Box
          onClick={login}
          className="mt-4 content-center border-2 border-black-primary
          flex items-center justify-center h-10 max-w-md mx-8
          rounded-full text-center"
        >
          <img class="w-5 mr-4" src={'/icons/google.svg'} alt="" />
          <p class="text-black-primary">Login with google</p>
        </Box>
        {#if $user_store.id != ''}
          <Box
            onClick={logout}
            className="mt-2 content-center border-2 border-black-primary
            flex items-center justify-center h-10 max-w-md mx-8
            rounded-full text-center"
          >
            <p class="text-black-primary">Logout</p>
          </Box>
        {/if}
      </Box>
    </Box>
  {/if}
</Box>

<style>
</style>
