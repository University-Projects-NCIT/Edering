<script lang="ts">
  import Box from "components/layouts/Box.svelte";
  import { user_store } from 'store';

  export let id = 'dfhfdhfdfh'
  const providerLink = `http://127.0.0.1:8080/resturant/?resturant_id=${id}&active_tab=menu`
  const QR_CODE_URL =`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${providerLink}` 

</script>

<Box flow='horizontal' justify='center' align='center' className="h-screen w-screen">
    <Box className="h-32 w- 32">
      <img src={QR_CODE_URL} alt = ''/> 
    </Box>
</Box>