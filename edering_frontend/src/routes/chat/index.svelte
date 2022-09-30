<script lang="ts">
  import { db } from 'config/conn_firebase';
  import { user_store } from 'store';
  import type { IMessage, IUser } from 'types';

  let user: IUser;
  const userStore = user_store.subscribe((value: IUser) => {
    user = value;
    console.log(user);
  });

  let msg = '';
  let result: IMessage[] = [];

  const hotelId = 'hotelid2';
  const customerId = 'customerid1';

  db.collection('db_messages')
    .doc(hotelId)
    .collection('customers')
    .doc(customerId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapData => {
      snapData.forEach(result => {
        console.log('Nested data', result.data());
      });
    });

  db.collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapData => {
      let newData: IMessage[] = [];

      snapData.forEach(result => {
        console.log('UID check: ', result.id);

        const msg = {
          id: result.id,
          createdAt: result.data().createdAt,
          msg: result.data().msg,
          sender: result.data().sender,
          receiver: result.data().receiver,
          type: result.data().type,
        } as IMessage;
        newData = [...newData, msg];
      });
      result = newData;
      console.log('data result ', result);
      // result = snapData.docs;
    });

  function addMsg() {
    //const date = Date.now();
    //db.collection("messages").doc(doc.id)
    const date = Date.now();
    db.collection('messages').add({
      createdAt: date,
      msg: msg,
      sender: 'sender ID',
      receiver: 'receiver ID',
      type: 'Order',
    });
    msg = '';
  }

  const addCustomerMsg = () => {
    const date = Date.now();
    db.collection('db_messages')
      .doc(hotelId)
      .collection('customers')
      .doc(customerId)
      .collection('messages')
      .add({
        id: date,
        createdAt: date,
        msg: 'MEssage 2',
        sender: hotelId,
        receiver: customerId,
        type: 'Order',
      });
  };
</script>

<div class="overflow-scroll">
  This is chat {user.name}
  <input bind:value={msg} />
  <button on:click={addMsg}>Submit</button>
  <button on:click={addCustomerMsg}>Add CustomerMSg </button>

  {#each result as r}
    <div>{r.msg}</div>
  {/each}
</div>

<style>
</style>
