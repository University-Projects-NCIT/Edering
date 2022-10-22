<script lang="ts">
    import type { IMessage } from "types";

    export let msg: IMessage;  
    const date = new Date(msg.createdAt);
</script>

<div class="rounded-tr-lg rounded-tl-lg rounded-br-lg px-3 py-1 bg-gray-primary">
  <p class="text-sm pb-1"> {msg.msg} </p>
  <p class = "" style="font-size: 8px;"> {date.toLocaleString()} </p>
</div>