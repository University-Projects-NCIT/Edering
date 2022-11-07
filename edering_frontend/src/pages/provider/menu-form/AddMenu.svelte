<script lang="ts">
  import { params } from '@roxi/routify';
  import Box from 'components/layouts/Box.svelte';
  import BarLoading from 'components/loading/BarLoading.svelte';
  import { storage } from 'config/conn_firebase';
  import { request } from 'helper';
  import { menuStore } from 'store';
  import { ApiRequestMethods, IMenu } from 'types';

  let fileinput;
  let isLoading = false;
  $: cId = $params.cId;

  const onFileSelected = async e => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    handleUploadImage(image, e.target.name);
  };

  const handleUploadImage = async (file, name) => {
    const imageSizeMB = file.size / 1024 / 1024;

    if (imageSizeMB > 3) {
      return alert(
        ' File size can not be more than 3 MB. Please compress you image and upload again !'
      );
    }

    const image_name = file.name;
    const timestamp = String(Math.round(new Date().getTime() / 1000));
    const uploadTask = storage
      .ref(`${name}/${timestamp + image_name}`)
      .put(file);
    let downloadableUrl: string = '';

    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(name)
          .child(timestamp + image_name)
          .getDownloadURL()
          .then(url => {
            downloadableUrl = url;
            console.log('downloadable url', url);
            // providerForm.set({
            //   name: $providerForm.name,
            //   location: $providerForm.location,
            //   image_id: url,
            //   known_for: $providerForm.known_for,
            //   close_time: $providerForm.close_time,
            //   open_time: $providerForm.open_time,
            //   created_at: $providerForm.created_at,
            // });
            $menuStore.image_url = url;
          });
      }
    );
  };
  const onMenuSubmit = async () => {
    // api call
    isLoading = true;
    const response: IMenu = await request({
      url: `/menus/`,
      method: ApiRequestMethods.post,
      data: {
        name: $menuStore.name,
        price: $menuStore.price,
        image_url: $menuStore.image_url,
        foodCategory: cId,
      },
    });
    isLoading = false;
    window.history.back();
  };
</script>

<Box>
  <div class="overflow-y-scroll">
    <div class="w-screen py-4 px-4">
      <h1 class="w-full font-bold text-lg text-center">Add Menu</h1>
    </div>
    <form
      on:submit|preventDefault={onMenuSubmit}
      class="px-4 overflow-y-scroll"
    >
      <Box className="pb-2">
        <img
          class="w-20 h-20 rounded-md mb-2 m-auto"
          src={$menuStore.image_url != ''
            ? $menuStore.image_url
            : '/icons/default-image.jpg'}
          alt=""
        />
        <img
          class="upload w-10 h-10 m-auto"
          src="https://static.thenounproject.com/png/625182-200.png"
          alt=""
          on:click={() => {
            fileinput.click();
          }}
        />
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={e => onFileSelected(e)}
          bind:this={fileinput}
        />
      </Box>
      <label for="name" class="text-sm pb-2 mt-2"> Name* </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="name"
        placeholder="Enter name"
        type="text"
        required
        bind:value={$menuStore.name}
      />

      <div class="py-2" />
      <label for="location" class="text-sm pb-2 pt-4"> Price* </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="location"
        placeholder="Enter Price..."
        type="text"
        required
        bind:value={$menuStore.price}
      />

      <div class="py-4" />
      <BarLoading {isLoading}>
        <button
          type="submit"
          class="w-full bg-sky-400 rounded text-white items-center justify-center py-2"
          >Submit</button
        >
      </BarLoading>
    </form>
    <div class="h-16" />
  </div>
</Box>
