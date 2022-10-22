<script lang="ts">
  import type { IMessage } from "types";

    export let msg: IMessage  
    const date = new Date(msg.createdAt) 
    const hour = date.getHours()
    const min = date.getMinutes()
</script>

<div class="rounded-tr-lg rounded-tl-lg w-full rounded-bl-lg px-3 py-1 bg-gray-primary">
  <p class="text-sm w-full pb-1"> {msg.msg} </p>
  <p style="font-size: 8px;"> {hour}:{min} </p>
</div>