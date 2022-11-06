<script lang='ts'>
  import { goto } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { db } from 'config/conn_firebase';
  import { getCustomer } from 'helper';
  import { userType, user_store } from 'store';
  import { onMount } from 'svelte';
  import type { IMessage } from 'types';
  import ChatUser from './components/ChatUser.svelte';

  export let senderID: string = $user_store.id 
  let customers: Cst[] = [{id: '', name: '', image: '', type: ''}]
  interface Cst{
    id?: string,
    name?: string,
    image?: string,
    type?: string 
  }

  const onClickItem = (cstId) => {
    db.collection(`db_messages`)
      .doc(senderID)
      .collection(`customers`)
      .doc(cstId)
      .set({pid: senderID, type: 'old'})

      console.log("sID ", senderID)
      $goto(`/chat/?senderId=${senderID}&&receiverId=${cstId}`)
  }

  // .where('id', '==', providerId)
  db.collectionGroup("customers")
  .onSnapshot( async (snapData) => {
    customers = []
    await snapData.forEach( async result => {
      const cstId = result?.id;
      const type = result?.data()?.type;
      const pid = result?.data()?.pid; 
      console.log(" type = " + type + " id = " + cstId )
      if(pid == senderID){
        await getCustomer(cstId).then( data => {
          if(Object.keys(data).length != 0){
            customers = [...customers, 
            {id: cstId, name: data.name, image: data.profile_image, type: type}
          ]
        }
      })
      }
    })
  })

</script>

<Box>
  <Box className="h-4"/>
  <Box className="px-4">
    {#if $userType =='Customer'}
      <Box className='h-full w-full' align='center'>
          <p class="inline text-black-primary text-sm">You are a Customer. Click chat button</p>
      </Box>
    {:else}
      {#each customers as customer}
        <ChatUser onClick={() => onClickItem(customer.id)} name = {customer.name ?? ''} image={customer.image ?? ''} type={customer.type ?? ''}/>
      {/each}
    {/if}
  </Box>
</Box>
