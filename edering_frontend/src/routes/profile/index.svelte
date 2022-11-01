<script lang="ts">
  import { goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { authState } from 'rxfire/auth';
  import { auth, googleProvider } from 'config/conn_firebase';
  import { ApiRequestMethods, IUser } from 'types';
  import { user_store, provider, customer, providerForm } from 'store';
  import { signInWithPopup } from 'firebase/auth';
  import { request } from 'helper';
  import ProviderForm from '../login/components/ProviderForm.svelte';
  import { userType } from 'store/usertype.store';
  import type { ICustomer, IProvider } from 'types';
  import Profile from '../../pages/profile/Profile.svelte'

  let showPrvForm = false;

  const unsubscribe = authState(auth).subscribe(user => {
    const result = {
      id: user?.uid ?? '',
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      type: $userType,
      imageUrl: user?.photoURL ?? '',
    };
    user_store.set(result);
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
  }

  const getCustomer = () => {
    const cstUrl = `/customers/?id=${$user_store.id}`;

    request<ICustomer>({
      url: cstUrl,
    }).then(res => {
      if (res.length > 0) {
        const cst = res[0];
        const customerResult = {
          id: cst.id,
          customer_order: cst.customer_order,
          user_scan: cst.user_scan,
        };
        customer.set(customerResult);
      }
    });
  };

  const getProvider = () => {
    const prvUrl = `/providers/?id=${$user_store.id}`;

    request<IProvider>({
      url: prvUrl,
    }).then(res => {
      if (res.length > 0) {
        const prv = res[0];
        const providerResult: IProvider = {
          id: prv.id,
          name: prv.name,
          location: prv.location,
          image_id: prv.image_id,
          known_for: prv.known_for,
          open_time: prv.open_time,
          close_time: prv.close_time,
          created_at: prv.created_at,
          food_categories: prv.food_categories,
          comments: prv.comments,
          ratings: prv.ratings,
          provider_order: prv.provider_order,
        };
        provider.set(providerResult);
      }
    });
  };

  const updatePrv = async () => {
    const userId = $user_store.id;
    const prvUrl = `/providers/?id=${userId}`;

    const provider: IProvider = {
      id: userId,
      name: $providerForm.name,
      location: $providerForm.location,
      image_id: $user_store.imageUrl,
      known_for: $providerForm.known_for,
      open_time: $providerForm.open_time,
      close_time: $providerForm.close_time,
      created_at: `${Date.now()}`,
    };

    await request({
      url: prvUrl,
      method: ApiRequestMethods.post,
      data: provider,
    }).then(res => {

      if(res != undefined && res.id != ''){
        showPrvForm = false 
        getProvider()
      }
    });
  };

  const updateCst = async () => {
    const userId = $user_store.id;
    const cstUrl = `/customers/?id=${userId}`;

    const customer: ICustomer = {
      id: userId,
    };

    request({ url: cstUrl }).then(res => {
      if (res.length == 0 && userId) {
        request({
          url: cstUrl,
          method: ApiRequestMethods.post,
          data: customer,
        }).then(res => {
          if (res.length > 0) {
            // updated customer goto profile
          }
          console.log(res);
        });
      }
    });
  };

  // when you load or reload the page
  auth.onAuthStateChanged(async auth => {
    if ($userType == 'Provider') {
      await getProvider();
    }
    if ($userType == 'Customer') {
      await getCustomer();
    }
    if (auth) {
      console.log('Loged in');
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
      <div>
        <h1>Customer Profile</h1>
        <Profile onLogout= {logout}/>
      </div>
    </Box>
  {:else if $provider.id != '' && $userType == 'Provider'}
    <Box>
      <div>
        <h1>Provider Profile</h1>
        <Profile onLogout= {logout}/>
        <div on:click={() => logout()}>Log out</div>
      </div>
    </Box>
  {:else if showPrvForm}
    <Box>
      <ProviderForm {updatePrv} />
    </Box>
  {:else}
    <Box
      className="min-h-screen w-screen bg-[url('/icons/login_back4.svg')] bg-cover "
    >
      <div class="pt-8">
        <div class="flex items-center justify-center mb-10">
          <div class="h-6 w-1/4 bg-[url('/icons/edering.png')] bg-cover" />
        </div>

        <div
          on:click={() => {
            userType.set('Customer');
          }}
          class="content-center border-2 {$userType == 'Customer'
            ? 'bg-color1-orange1'
            : 'bg-transparent'}
          border-color1-blueText flex items-center justify-center h-10 max-w-md mx-8
            rounded-full text-center"
        >
          <p class="text-color1-blueText">Login as a Customer</p>
        </div>

        <div
          on:click={() => {
            userType.set('Provider');
          }}
          class="mt-4 content-center border-2 {$userType == 'Provider'
            ? 'bg-color1-orange1'
            : 'bg-transparent'}
          border-color1-green1 flex items-center justify-center h-10 max-w-md mx-8
            rounded-full text-center"
        >
          <p class="text-color1-green1">Login as a Provider</p>
        </div>

        <div class="flex items-center justify-center mt-10">
          <div class="w-40 h-40 bg-[url('/icons/placeholder.png')] bg-cover" />
        </div>

        <div
          on:click={login}
          class="mt-4 content-center border-2 border-black-primary
          flex items-center justify-center h-10 max-w-md mx-8
          rounded-full text-center"
        >
          <img class="w-5 mr-4" src={'/icons/google.svg'} alt="" />
          <p class="text-black-primary">Login with google</p>
        </div>

        {#if $user_store.id}
          <!-- Redirect ot profile page -->
          <div on:click={() => logout()}>Log out</div>
        {/if}
      </div>
    </Box>
  {/if}
</Box>

<style>
</style>
