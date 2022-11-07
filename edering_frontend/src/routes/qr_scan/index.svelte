<!-- <script src="https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js"></script> -->
<script lang="ts">
  import { user_store, userType } from 'store';
  //import { Html5QrcodeScanner } from 'html5-qrcode';
  import Box from 'components/layouts/Box.svelte';

  let result 

  const providerLink = `http://127.0.0.1:8080/resturant/?resturant_id=${$user_store.id}&active_tab=menu`
  const QR_CODE_URL =`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${providerLink}` 

</script>

<!-- <div id="qr-reader" style="width: 600px"></div> -->
<Box flow='horizontal' justify='center' align='center' className="h-screen w-screen">
    <!-- <Box className="h-32 w- 32">
      <img src={QR_CODE_URL} alt = ''/> 
    </Box> -->
  <!-- {#if $userType == 'Customer'}
    <img>
  {/if} -->

</Box>

