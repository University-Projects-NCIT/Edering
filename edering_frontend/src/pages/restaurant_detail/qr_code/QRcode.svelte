<script lang="ts">
  import { params } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import { user_store } from 'store';

  $: id = $params?.restaurant_id;
  $: console.log('id', id);
  $: providerLink = `http://127.0.0.1:8080/resturant/?resturant_id=${id}&active_tab=menu`;
  $: QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${providerLink}`;
</script>

<Box
  flow="horizontal"
  justify="center"
  align="center"
  className="w-screen mt-24"
>
  <Box className="h-32 w- 32">
    <img src={QR_CODE_URL} alt="" />
  </Box>
</Box>
