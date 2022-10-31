<script lang="ts">
  import leaflet from 'leaflet'
  import PickAPlace from 'svelte-pick-a-place'
</script>

<div class="w-screen h-screen ">
  <PickAPlace lat = {27.7172} lang={85.3240} zoom ={10}  buttons={false} leaflet={leaflet} 
  on:update={() => console.log('Update!') } 
  on:save={() => console.log('On save!')} />
</div>