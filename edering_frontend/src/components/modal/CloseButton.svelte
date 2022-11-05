<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
</script>

<button on:click class="focus:ring-0 focus:outline-none">
  <Box className="close-icon-wrapper">
    <Box
      position="absolute"
      rounded="2xl"
      align="center"
      justify="center"
      className="group p-2 w-8 h-8 lg:w-11 lg:h-11 bg-white2-primary top-3 right-3 lg:top-5 lg:right-5 hover:bg-purple-tertiary transition duration-300"
    >
      <img src="/images/close-icon.svg" alt="close icon" />
    </Box>
  </Box>
</button>

<style>
  :global(.close-icon-wrapper) {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135.001' height='134.718' viewBox='0 0 135.001 134.718'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%236300df;%7D%3C/style%3E%3C/defs%3E%3Cpath class='a' d='M135,134.718h0A34.97,34.97,0,0,0,100,100H69.621A34.979,34.979,0,0,1,35,65.318V35a34.782,34.782,0,0,0-2.75-13.624,34.883,34.883,0,0,0-7.5-11.125,34.883,34.883,0,0,0-11.125-7.5A34.782,34.782,0,0,0,0,0H100a34.971,34.971,0,0,1,35,35Z' transform='translate(0 0)'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    right: 0;
    top: 0;
    height: 70px;
    width: 70px;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    :global(.close-icon-wrapper) {
      height: 110px;
      width: 110px;
    }
  }
</style>
