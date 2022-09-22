<script>
  import Button from "components/buttons/Button.svelte";

  
  let count = 0 
  const click = () => {
    count = count + 1
  }

</script>

<Button label="click" size="small"></Button>

<style>
  h1{
    font-size: 32px;
    color: blueviolet;
  }
</style>