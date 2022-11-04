<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from 'config/conn_firebase';
  import { user_store, userType } from 'store';
  import type { IMessage, IUser } from 'types';
  import Box from '../../components/layouts/Box.svelte';
  import {afterUpdate, tick} from 'svelte';
  import CustomerOrderMsg from 'pages/restaurant_detail/chat/components/CustomerOrderMsg.svelte';
  import SendMsg from 'pages/restaurant_detail/chat/components/SendMsg.svelte';
  import RecieveMsg from 'pages/restaurant_detail/chat/components/RecieveMsg.svelte';

  let messageInput = '';
  let msgData: IMessage[] = [];
  let msgElement;

  export let receiverId: string = ""
  export let orderMsg: String = ""
  // const providerId = 'hotelid2';
  let providerId = 'hotelid2';
  // const customerId = 'customerid1';
  let customerId = 'customerid1';

  onMount(() => {
    if($userType == 'Customer'){
      customerId = currentLogedUserId; 
      providerId = receiverId;
    }else{
      customerId = receiverId;
      providerId = currentLogedUserId;
    }
  });
  
  const currentLogedUserId = $user_store.id;

  db.collection('db_messages')
    .doc(providerId)
    .collection('customers')
    .doc(customerId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapData => {
      msgData = [];
      snapData.forEach(result => {
        if(result?.data()?.createdAt){
          const msg = {
          id: result.id,
          createdAt: result.data().createdAt,
          msg: result.data().msg,
          canceled: result.data().canceled,
          declined: result.data().declined,
          accepted: result.data().accepted,
          sender: result.data().sender,
          receiver: result.data().receiver,
          type: result.data().type,
        } as IMessage;
        msgData = [...msgData, msg];
        console.log('Nested data', result.data());
        }
      });
    });

  afterUpdate(() => {
		if(msgData) scrollToBottom(msgElement);
  });
	
	$: if(msgData && msgElement) {
		scrollToBottom(msgElement);
	};

  $: if (msgData && msgElement) {
    scrollToBottom(msgElement);
  };

  const scrollToBottom = async node => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  };

  const sendMsg = () => {
    const date = Date.now();
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .add({
        createdAt: date,
        msg: messageInput,
        accepted: false,
        declined: false,
        canceled: false,
        sender: currentLogedUserId,
        receiver: customerId,
        type: 'MSG',
      });
    messageInput = '';
  };

  const sendOrderMsg = () => {
    const date = Date.now();
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .add({
        createdAt: date,
        msg: orderMsg,
        accepted: false,
        declined: false,
        canceled: false,
        sender: customerId,
        receiver: providerId,
        type: 'Order',
      });
    messageInput = '';
  };

</script>

<Box>
  <Box className="relative">
    <Box className="h-full">
      <div bind:this={msgElement} style="height:600px; overflow:auto;">
        {#each msgData as msg, index}
        {#if index == 0}
        <Box className="h-4" />
        {/if}
        {#if msg?.type == 'Order'}
          <CustomerOrderMsg 
            msg = { msg }
            {providerId}
            {customerId}
            />
        {:else if msg?.sender == currentLogedUserId}
          <!-- //msg from current user , outgoing msg  -->
          <Box className="px-4 py-1 w-5/6 float-left">
            <SendMsg {msg} />
          </Box>
        {:else}
          <!-- //incoming msg  -->
          <Box className="px-4 py-1 w-5/6 float-right">
            <RecieveMsg {msg} />
          </Box>
        {/if}
        {/each}
      </div>
      <Box className="h-24" />
    </Box>
    <Box className="flex justify-items-center items-center fixed
    bottom-10 bg-gray-primary w-screen">
      <input
        class="bg-gray-primary inline appearance-none rounded
        w-full pt-2 pb-4 px-4 text-gray-700 leading-tight
        focus:outline-none text-sm"
        id="inline-full-name"
        placeholder="Enter message"
        type="text"
        bind:value={messageInput}
      />
      <Box className="inline  pr-4" on:click={sendMsg}>
        <img class="w-4 h-4" src={'icons/paper-plane-solid.svg'} alt="" />
      </Box>
    </Box>
  </Box>
</Box>