<script lang="ts">
  import { db } from 'config/conn_firebase';
  import { user_store, userType } from 'store';
  import type { IMessage, IUser } from 'types';
  import Box from '../../components/layouts/Box.svelte';
  import {afterUpdate, tick} from 'svelte';
  import CustomerOrderMsg from 'pages/restaurant_detail/chat/components/CustomerOrderMsg.svelte';
  import ProviderOrderMsg from 'pages/restaurant_detail/chat/components/ProviderOrderMsg.svelte';
  import SendMsg from 'pages/restaurant_detail/chat/components/SendMsg.svelte';
  import RecieveMsg from 'pages/restaurant_detail/chat/components/RecieveMsg.svelte';

  let messageInput = '';
  let msgData: IMessage[] = [];
  let msgElement;

  export let providerId = 'hotelid2';
  export let customerId = 'customerid1';
  export let receiverId: String = ""
  export let orderMsg: String = ""

  const currentLogedUserId = $user_store.id;

  const orderMsgs: IMessage = {
    createdAt: new Date(),
    msg: "C momo-3, Chicken Momo-4,Buff Momo-3,Burger-3,Chowmen-6",
    accepted: false,
    declined: false,
    canceled: false,
    sender: "sdgdgs",
    receiver: "sdgs",
    type: 'Order',
  }

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
        sender: currentLogedUserId,
        receiver: customerId,
        type: 'Order',
      });
    messageInput = '';
  };

  const onSendMsg = () => {
    sendMsg();
  };

  const onUpdateMsg = msg => {
    const newMsg = {
      createdAt: msg.createdAt,
      msg: msg.msg,
      accepted: msg.accepted,
      declined: msg.declined,
      canceled: msg.canceled,
      sender: msg.sender,
      receiver: msg.receiver,
      type: 'Msg',
    };
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .doc(msg.id)
      .update(newMsg);
  };
</script>

<Box>
  <div class="relative">
    <div class="h-full">
      <!-- <div bind:this={msgElement} class="h-5/6 overflow-auto"> -->
      <div bind:this={msgElement} style="height:600px; overflow:auto;">
        <CustomerOrderMsg msg = { orderMsgs }/>
        <ProviderOrderMsg msg = { orderMsgs }/>
        {#each msgData as msg, index}
          {#if index == 0}
            <div class="h-4" />
          {/if}
          {#if msg?.type == 'Order'}
            <!-- // order type msg  -->
            <!-- {#if $userType == 'Customer'}
            {/if}
            {#if $userType == 'Provider'}
            {/if} -->
          {:else if msg?.sender == currentLogedUserId}
            <!-- //msg from current user , outgoing msg  -->
            <div class="px-4 py-1 w-5/6 float-left">
              <SendMsg {msg} />
            </div>
          {:else}
            <!-- //incoming msg  -->
            <div class="px-4 py-1 w-5/6 float-right">
              <RecieveMsg {msg} />
            </div>
          {/if}
        {/each}
      </div>
      <div class="h-24" />
    </div>
    <div
      class="flex justify-items-center items-center fixed bottom-10 bg-gray-primary w-screen"
    >
      <input
        class="bg-gray-primary inline appearance-none rounded w-full pt-2 pb-4 px-4 text-gray-700
        leading-tight focus:outline-none text-sm"
        id="inline-full-name"
        placeholder="Enter message"
        type="text"
        bind:value={messageInput}
      />
      <div class="inline  pr-4" on:click={onSendMsg}>
        <img class="w-4 h-4" src={'icons/paper-plane-solid.svg'} alt="" />
      </div>
    </div>
  </div>
</Box>

<style>
</style>
