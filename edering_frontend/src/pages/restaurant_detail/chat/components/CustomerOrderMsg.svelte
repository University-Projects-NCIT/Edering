<script lang="ts">
  import { each } from "svelte/internal";
  import type { IMessage } from "types";

  export let msg: IMessage;

  // receive msg format as= "C Momo-2,Buff Momo-3,Chicken Chowmen-4,Burge-4"
  const orderMsg: string[][] = msg.msg?.split(",").map( (val) => {
    val.split("-")
  }) ?? [""][""]

  const msgSplit1 = msg.msg?.split(",") ?? []
  //const msgSplit2 = msgSplit1[0]?.split("-") ?? []
  console.log("Order msg ", orderMsg)
  console.log(" msg split1 ", msgSplit1)

</script>

<div class="p-4 text-yellow-50">
  <div class="rounded-2xl bg-gradient-to-r m-2 p-2 from-indigo-500 via-purple-500 to-pink-500">
    <div class="pb-2">
      <h1 class="pb-2 pt-1 text-xl">Order summery</h1>
      <hr/>
    </div>
    <div class="px-4">
      {#each orderMsg as item }
        <p>{item}</p>
        <p></p>
      {/each}
    </div>

    <div class="flex pt-4 justify-center">
      <button class="rounded-full px-4 py-1 {msg.accepted? "bg-green-500" : "bg-zinc-300"} mr-1">Accepted</button>
      <button class="rounded-full px-4 py-1 bg-red-500 ml-1">Cancel</button>
    </div>

  </div>
</div>


