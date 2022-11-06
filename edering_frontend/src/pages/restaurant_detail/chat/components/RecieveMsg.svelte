<script lang="ts">
  import type { IMessage } from "types";

    export let msg: IMessage  
    const date = msg.createdAt ? new Date(msg.createdAt) : new Date() 
</script>

<div class="rounded-tr-xl rounded-tl-xl w-full rounded-bl-xl px-3 py-1 bg-gray-primary w-max-con table-caption"
  style="width: auto; display: inline-block; float: right;">
  <p class="text-sm w-full pb-1"> {msg.msg} </p>
  <p class = "" style="font-size: 8px;"> {date.toLocaleString()} </p>
</div>