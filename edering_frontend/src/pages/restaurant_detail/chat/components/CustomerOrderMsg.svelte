<script lang="ts">
  import type { IMessage } from "types";
  import { userType } from 'store'
  import Box from "components/layouts/Box.svelte";
  import { db } from 'config/conn_firebase';


  export let msg: IMessage;
  export let providerId;
  export let customerId;

  // receive msg format as= "C Momo-2,Buff Momo-3,Chicken Chowmen-4,Burge-4"
  const msgSplit1 = msg.msg?.split(",") ?? []
  let orderItems: string[][] = []
  msgSplit1.forEach( (oMsg) => {
    orderItems = [...orderItems,oMsg.split('-')]
  })

  userType.set('Provider')

  const onUpdateOrderMsg = msg => {
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .doc(msg.id)
      .update(msg);
  };

  function onDecline(){
    msg.declined = !msg.declined;
    onUpdateOrderMsg(msg);
  }

  function onAccept(){
    msg.accepted = !msg.accepted;
    onUpdateOrderMsg(msg);
  }

  function onCancel(){
    msg.canceled = !msg.canceled;
    onUpdateOrderMsg(msg);
  }

</script>

<Box className=" text-yellow-50 px-4 py-2">
  <Box className="rounded-2xl bg-gradient-to-r mx-2 p-2
   from-indigo-500 via-purple-500 to-pink-500">
    <Box className="pb-2 w-full">
      <h1 class="pb-2 pt-1 text-xl w-full text-center">Order summery</h1>
      <hr/>
    </Box>
    <Box className="px-4">
      {#each orderItems as item }
      <Box className="justify-between" style="display:flex;">
        <p>{item[0]}</p>
        <p>{item[1]}</p>
      </Box>
      {/each}
    </Box>

    {#if $userType == 'Customer'}
      <Box className="flex pt-4 justify-center">
        <button class="{
          msg.accepted? "bg-green-500" : "bg-amber-100 text-black-primary" }
          mr-1 rounded-full px-4 py-1 text-sm">Accepted</button>
        <button on:click={onCancel} class="rounded-full px-4 py-1 bg-red-400 ml-1 text-sm">
          { msg.canceled ? "Cancelled": "Cancel" }
        </button>
      </Box>
    {/if}
    {#if $userType == 'Provider'}
      <Box className="flex pt-4 justify-center">
        <button on:click={onAccept} class="{
          msg.accepted? "bg-green-500 disabled" : "bg-amber-100 text-black-primary" }
          mr-1 rounded-full px-4 py-1 text-sm">
          { msg.accepted ? "Accepted" : "Accept" }
        </button>
        <button on:click={onDecline} class="rounded-full px-4 py-1 bg-red-400 ml-1 text-sm">
          {msg.declined ? "Declined": "Deline"}
        </button>
      </Box>
    {/if}
  </Box>
</Box>


