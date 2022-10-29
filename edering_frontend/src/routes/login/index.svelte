<script lang="ts">
  import { goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { authState } from 'rxfire/auth';
  import { auth, googleProvider } from 'config/conn_firebase';
  import {ApiRequestMethods, IUser} from 'types';
  import { user_store, provider, customer} from 'store';
  import { signInWithPopup } from 'firebase/auth';
  import type { UserType } from 'types/UserType';
  import type { Customer, Provider } from 'types';
  import { request } from 'helper';

  let userType: UserType = 'Customer'

  const unsubscribe = authState(auth).subscribe(user => {
    const result = {
      id: user?.uid ?? '',
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      type: userType,
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

  const getCustomer = () => {
    const cstUrl = `/customers/?id=${$user_store.id}`;

    request<Customer>({
      url : cstUrl
    }).then( res => {
      if(res.count != 0){
        const cst = res[0]
        const customerResult = {
          id : cst.id,
          customer_order: cst.customer_order,
          user_scan: cst.user_scan
        };
        customer.set(customerResult);
      }
    });
  }

  const getProvider = () => {
    const prvUrl = `/providers/?id=${$user_store.id}`

    request<Provider>({
      url : prvUrl
    }).then( res => {
      if(res.count != 0){
        const prv = res[0];
        const providerResult = {
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

        console.log("provider store ", $provider);
        console.log("provider response ", res);
      }
    })
  }

  // when you load or reload the page
  auth.onAuthStateChanged( async (auth) => {
    getProvider();
    getCustomer();
    if (auth) {
      console.log("Loged in");
    
      const userId = $user_store.id;
      const cstUrl = `/customers/?id=${userId}`;
      const prvUrl = `/providers/?id=${userId}`;
      const url = (userType == 'Customer') ? cstUrl : prvUrl; 

      const customer: Customer = {
        id : userId,
      }

      const provider: Provider = {
        id: userId,
        name: "test",
        location: "34.34,3434.34",
        image_id: $user_store.imageUrl,
        known_for: "Momo",
        open_time: "10:30 AM",
        close_time: "12:30 PM",
        created_at: Date.now()
      }

      request({ url }).then( res => {
        if(res.count ==0 && userId){
          request({
            url,
            'method': ApiRequestMethods.post,
            'data': (userType == 'Customer') ? customer : provider 
            }
          ).then(res => {
            console.log(res)
          })
        }
      })
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
      on:click={() => { userType = 'Customer'}}
      class="content-center border-2 {userType == 'Customer' ? 'bg-color1-orange1': 'bg-transparent'}
       border-color1-blueText flex items-center justify-center h-10 max-w-md mx-8
        rounded-full text-center">
      <p class="text-color1-blueText">Login as a Customer</p>
    </div>

    <div
      on:click={() => { userType = 'Provider'}}
      class="mt-4 content-center border-2 {userType == 'Provider' ? 'bg-color1-orange1': 'bg-transparent'}
       border-color1-green1 flex items-center justify-center h-10 max-w-md mx-8
        rounded-full text-center">
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

    
    {#if $user_store.id}
      <!-- Redirect ot profile page -->
      <div on:click={() => logout()}>Log out</div>  
    {/if}
  </div>
</Box>

<style>
</style>
