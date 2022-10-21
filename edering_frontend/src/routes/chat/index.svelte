const s = `<script lang="ts">
  import { db } from 'config/conn_firebase';
  import { user_store } from 'store';
  import type { IMessage, IUser } from 'types';

  let user: IUser;
  const userStore = user_store.subscribe((value: IUser) => {
    user = value;
    console.log(user);
  });

  let messageInput = ""
  let msgData: IMessage[] = []

  const providerId = 'hotelid2';
  const customerId = 'customerid1';

  db.collection('db_messages')
    .doc(providerId)
    .collection('customers')
    .doc(customerId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapData => {
      snapData.forEach(result => {
        const msg = {
          id: result.id,
          createdAt: result.data().createdAt,
          msg: result.data().msg,
          sender: result.data().sender,
          receiver: result.data().receiver,
          type: result.data().type,
        } as IMessage;
        msgData = [...msgData, msg];
        console.log('Nested data', result.data());
      });
    });

  // db.collection('messages')
  //   .orderBy('createdAt', 'asc')
  //   .onSnapshot(snapData => {
  //     let newData: IMessage[] = [];

  //     snapData.forEach(result => {
  //       console.log('UID check: ', result.id);

  //       const msg = {
  //         id: result.id,
  //         createdAt: result.data().createdAt,
  //         msg: result.data().msg,
  //         sender: result.data().sender,
  //         receiver: result.data().receiver,
  //         type: result.data().type,
  //       } as IMessage;
  //       newData = [...newData, msg];
  //     });
  //     result = newData;
  //     console.log('data result ', result);
  //     // result = snapData.docs;
  //   });

  // function addMsg() {
  //   //const date = Date.now();
  //   //db.collection("messages").doc(doc.id)
  //   const date = Date.now();
  //   db.collection('messages').add({
  //     createdAt: date,
  //     msg: msg,
  //     sender: 'sender ID',
  //     receiver: 'receiver ID',
  //     type: 'Order',
  //   });
  //   msg = '';
  // }

  const id  = "123abc"

  const addCustomerMsg = () => {
    const date = Date.now();
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .add({
        id: id,
        createdAt: date,
        msg: messageInput,
        sender: providerId,
        receiver: customerId,
        type: 'Order',
      });
  };

  const onSendMsg = () => {
      addCustomerMsg()
  };

  const onUpdateMsg = (up_id) => {
    const date = Date.now();
    db.collection('db_messages')
      .doc(providerId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .add({
        id: up_id,
        createdAt: date,
        msg: messageInput,
        sender: providerId,
        receiver: customerId,
        type: 'msg',
      });
  }

</script>`

<div>
  <div class="overflow-scroll relative">
  <!-- This is chat {user.name} -->
  <button on:click={onUpdateMsg}>Update</button>
  
  {#each msgData as r}
    <div>{r.msg} from {r.id} type = {r.type}</div>
    <button on:click={() => onUpdateMsg(r.id)}>Update</button>
  {/each}
  
  <div class="h-10"></div>
</div>
<div class="flex justify-items-center items-center absolute bottom-14 bg-gray-primary w-screen">
  <input class="bg-gray-primary inline appearance-none rounded w-full py-2 px-4 text-gray-700
    leading-tight focus:outline-none text-sm" 
    id="inline-full-name" placeholder="Enter message" type="text" bind:value={messageInput}>  
  <div class="inline  pr-4" on:click={onSendMsg}>
    <img class ="w-4 h-4" src = {'icons/paper-plane-solid.svg'} alt=""/>
  </div>
</div>
</div>

<style>
</style>
