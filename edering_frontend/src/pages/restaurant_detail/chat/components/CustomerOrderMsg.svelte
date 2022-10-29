<script lang="ts">
  import type { IMessage } from "types";


  export let msg: IMessage;
  export let items = []

</script>

<div class="p-4 text-yellow-50">
  <div class="rounded-2xl bg-gradient-to-r p-2 from-indigo-500 via-purple-500 to-pink-500">
    <div class="pb-2">
      <h1 class="pb-2 pt-1 text-2xl">Order summery</h1>
      <hr/>
    </div>
    <div class="px-4">
      <div class="py-1 flex justify-between">
        <p>Momo</p>
        <p>2</p>
      </div>
      <div class="py-1 flex justify-between">
        <p>Burger</p>
        <p>1</p>
      </div>
      <div class="py-1 flex justify-between">
        <p>Chowmen</p>
        <p>5</p>
      </div>
    </div>

    <div class="flex pt-4 justify-center">
      <button class="rounded-full px-4 py-1 {msg.accepted? "bg-green-500" : "bg-zinc-300"} mr-1">Accepted</button>
      <button class="rounded-full px-4 py-1 bg-red-500 ml-1">Cancel</button>
    </div>

  </div>
</div>


