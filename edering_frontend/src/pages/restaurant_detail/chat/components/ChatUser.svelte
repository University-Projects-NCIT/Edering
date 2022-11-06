<script lang='ts'>
  import Box from "components/layouts/Box.svelte";

  export let onClick = () => {} 
  export let name: string 
  export let image: string 
  export let type: string 
</script>

<Box onClick = {onClick} flow='horizontal' align='center'  className ='py-2'>
    <img class="rounded-full h-7 w-7 inline" src = {image} alt =''/>
    <p class="pl-4 text-xs {type ==  'old' ? 'text-black-primary': 'text-color1-blueText font-bold'}">{name}</p>
</Box>
