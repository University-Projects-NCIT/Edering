<script lang="ts">
  import {auth} from 'config/conn_firebase';
  import 'firebase/compat/auth';
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import { authState } from 'rxfire/auth';
  import { user_store} from '../src/store/user.store';

  let _selectedUser = "Provider "; //fetch from api later 

  const unsubscribe = authState(auth).subscribe( user => {  
    const result = {
      id: user?.uid ?? "",
      name: user?.displayName ?? "",
      email: user?.email ?? "",
      type: _selectedUser,
      imageUrl: user?.photoURL ?? ""
    };
    user_store.set(result);
  });

</script>

<Router {routes} />
