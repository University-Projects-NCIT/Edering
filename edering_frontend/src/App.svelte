<script lang="ts">
  import { envData } from 'config';
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import { initializeApp } from 'firebase/app';

  initializeApp(envData.firebase);
</script>

<!-- 
<Button variant="transparent" label="Order" />
<Button type="outlined" variant="dark" label="Order" />
<Button type="filled" variant="dark" label="Order" />
<Button type="outlined" variant="primary" label="Order" />
<Button type="filled" variant="primary" label="Order" />
<Button type="filled" variant="gray" label="Order" /> -->

<Router {routes} />
