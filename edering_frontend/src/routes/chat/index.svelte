<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from 'config/conn_firebase';
  import { user_store, userType } from 'store';
  import type { IMessage, IUser } from 'types';
  import Box from '../../components/layouts/Box.svelte';
  import { afterUpdate, tick } from 'svelte';
  import CustomerOrderMsg from 'pages/restaurant_detail/chat/components/CustomerOrderMsg.svelte';
  import SendMsg from 'pages/restaurant_detail/chat/components/SendMsg.svelte';
  import RecieveMsg from 'pages/restaurant_detail/chat/components/RecieveMsg.svelte';
  import { getCustomer, getProvider } from 'helper';
  import { params } from '@roxi/routify';
  import type { UserType } from 'types/UserType';

  let messageInput = '';
  let msgData: IMessage[] = [];
  let msgElement;

  $: receiverId = $params?.receiverId;
  $: senderId = $params?.senderId;
  $: orderMsg = $params?.order_msg;
  $: tableNumber = $params?.tableNumber;

  $: console.log('ordermsg', orderMsg);

  let providerId;
  let customerId;
  let receiverName: string = '';
  let receiverImgUrl: string = '';

  const currentLogedUserId = $user_store.id;

  const checkUserType = id => {
    console.log(id + ' uid ' + $user_store.id);
    if (id == $user_store.id) {
      return $userType == 'Customer' ? 'Customer' : 'Provider';
    } else return false;
  };

  onMount(() => {
    let receiverResult = checkUserType(receiverId);

    if (receiverResult) {
      if (receiverResult == 'Customer') {
        providerId = senderId;
        customerId = receiverId;
        getCustomer(customerId).then(data => {
          receiverName = data.name ?? '';
          receiverImgUrl = data.profile_image ?? '';
        });
      } else {
        providerId = receiverId;
        customerId = senderId;
        getProvider(providerId).then(data => {
          receiverName = data.name ?? '';
          receiverImgUrl = data.image_id ?? '';
        });
      }
    }

    const senderResult = checkUserType(senderId);
    if (senderResult) {
      if (senderResult == 'Customer') {
        providerId = receiverId;
        customerId = senderId;
        getProvider(providerId).then(data => {
          receiverName = data.name ?? '';
          receiverImgUrl = data.image_id ?? '';
        });
      } else {
        providerId = senderId;
        customerId = receiverId;
        getCustomer(customerId).then(data => {
          receiverName = data.name ?? '';
          receiverImgUrl = data.profile_image ?? '';
        });
      }
    }

    if (orderMsg) {
      //send order msg
      sendOrderMsg();
    }

    db.collection(`db_messages`)
      .doc(providerId)
      .collection(`customers`)
      .doc(customerId)
      .collection(`messages`)
      .orderBy(`createdAt`, `asc`)
      .onSnapshot(snapData => {
        msgData = [];
        snapData.forEach(result => {
          if (result?.data()?.createdAt) {
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
  });

  // db.collection(`db_messages`)
  //   .doc(providerId)
  //   .collection(`customers`)
  //   .doc(customerId)
  //   .collection(`messages`)
  //   .orderBy(`createdAt`, `asc`)
  //   .onSnapshot(snapData => {
  //     msgData = [];
  //     snapData.forEach(result => {
  //       if(result?.data()?.createdAt){
  //         const msg = {
  //         id: result.id,
  //         createdAt: result.data().createdAt,
  //         msg: result.data().msg,
  //         canceled: result.data().canceled,
  //         declined: result.data().declined,
  //         accepted: result.data().accepted,
  //         sender: result.data().sender,
  //         receiver: result.data().receiver,
  //         type: result.data().type,
  //       } as IMessage;
  //       msgData = [...msgData, msg];
  //       console.log('Nested data', result.data());
  //       }
  //     });
  //   });

  afterUpdate(() => {
    if (msgData) scrollToBottom(msgElement);
  });

  $: if (msgData && msgElement) {
    scrollToBottom(msgElement);
  }

  const scrollToBottom = async node => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  };

  const sendMsg = async () => {
    const date = Date.now();

    console.log('s pid ', providerId);
    console.log('s cid ', customerId);

    db.collection(`db_messages`)
      .doc(providerId)
      .collection(`customers`)
      .doc(customerId)
      .set({ pid: providerId, type: 'new' });

    db.collection(`db_messages`)
      .doc(providerId)
      .collection(`customers`)
      .doc(customerId)
      .collection(`messages`)
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
    //TODO
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
    <div class="fixed flex-row opacity-90 bg-gray-primary p-2 w-full">
      <img
        class="rounded-full inline h-10 w-10 p-2"
        src={receiverImgUrl != '' ? receiverImgUrl : '/icons/default-image.jpg'}
        alt=""
      />
      <p class="text-sm inline text-black-primary">{receiverName}</p>
    </div>
    <Box className="">
      <div bind:this={msgElement} style="height:600px;overflow:scroll;">
        {#each msgData as msg, index}
          {#if index == 0}
            <Box className="h-14" />
          {/if}
          {#if msg?.type == 'Order'}
            <CustomerOrderMsg {msg} {providerId} {customerId} />
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
      <Box className="h-20" />
    </Box>
    <Box
      className="flex justify-items-center items-center fixed
      bottom-10 bg-gray-primary w-screen"
    >
      <input
        class="bg-gray-primary inline appearance-none rounded
        w-full pt-2 pb-4 px-4 text-gray-700 leading-tight
        focus:outline-none text-sm"
        id="inline-full-name"
        placeholder="Enter message"
        type="text"
        bind:value={messageInput}
      />
      <Box className="inline pr-6" onClick={sendMsg}>
        <!-- <button class="rounded-md bg-amber-200 text-black-primary">Send</button> -->
        <img class="w-4 h-4" src="/icons/paper-plane-solid.svg" alt="" />
      </Box>
    </Box>
  </Box>
</Box>
