<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import { provider, providerForm, user_store } from 'store';
  import { storage } from 'config/conn_firebase';
  import dayjs from 'dayjs';
  import { ApiRequestMethods, IProvider } from 'types';
  import { getProvider, request } from 'helper';
  import { goto } from '@roxi/routify';
  import BarLoading from 'components/loading/BarLoading.svelte';

  let avatar, fileinput;

  export let providerFormType: 'Add' | 'Update' = 'Update';
  export let isLoading = false;

  export let updatePrv = () => {};

  let editPrv = async () => {
    isLoading = true;
    const userId = $user_store.id;
    const prvUrl = `/providers/${userId}/`;

    const updatedProvider: IProvider = {
      id: userId,
      name: $providerForm.name,
      location: $providerForm.location,
      image_id: $providerForm.image_id,
      known_for: $providerForm.known_for,
      open_time: $providerForm.open_time,
      close_time: $providerForm.close_time,
      created_at: `${Date.now()}`,
    };

    await request<IProvider>({
      url: prvUrl,
      method: ApiRequestMethods.patch,
      data: updatedProvider,
    }).then(data => {
      if (Object.keys(data).length != 0) {
        if (Object.keys(data).length != 0) {
          getProvider(userId).then(data => {
            provider.set(data);
            isLoading = false;

            // $goto(`/profile`);
            window.history.back();
          });
        }
      }
    });
  };

  $: {
    if ($provider.id) {
      providerForm.update(store => ({
        name: $provider.name ?? '',
        known_for: $provider.known_for ?? '',
        location: $provider.location ?? '',
        open_time: $provider.open_time ?? '',
        close_time: $provider.close_time ?? '',
        image_id: $provider.image_id ?? '',
        created_at: Number($provider.created_at),
      }));
    }
  }

  const onSubmit = () => {
    switch (true) {
      case $providerForm.close_time == '':
        return alert("close time can't be empty");
      case $providerForm.open_time == '':
        return alert("Open time can't be empty");
      case $providerForm.name == '':
        return alert("Name can't be empty");
      case $providerForm.location == '':
        return alert("Location can't be empty");
    }
    console.log('update', $providerForm.close_time);
    if (providerFormType === 'Update') {
      editPrv();
    } else {
      updatePrv();
    }
  };

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
            providerForm.set({
              name: $providerForm.name,
              location: $providerForm.location,
              image_id: url,
              known_for: $providerForm.known_for,
              close_time: $providerForm.close_time,
              open_time: $providerForm.open_time,
              created_at: $providerForm.created_at,
            });
          });
      }
    );
  };
</script>

<Box>
  <div class="overflow-y-scroll">
    <div class="w-screen py-4 px-4">
      <h1 class="w-full font-bold text-lg text-center">Update Provider</h1>
    </div>
    <form on:submit|preventDefault={onSubmit} class="px-4 overflow-y-scroll">
      <Box className="pb-2">
        <img
          class="w-20 h-20 rounded-md mb-2 m-auto"
          src={$providerForm.image_id != ''
            ? $providerForm.image_id
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
        bind:value={$providerForm.name}
      />

      <div class="py-2" />
      <label for="location" class="text-sm pb-2 pt-4"> Location* </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="location"
        placeholder="Enter location"
        type="text"
        bind:value={$providerForm.location}
      />

      <div class="py-2" />
      <label for="known_for" class="text-sm pb-2 pt-4"> Known for </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="known_for"
        placeholder="Enter known for"
        type="text"
        bind:value={$providerForm.known_for}
      />

      <div class="py-2" />
      <label for="open_time" class="text-sm pb-2 pt-4"> Open time* </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="open_time"
        placeholder="Enter open time"
        type="time"
        bind:value={$providerForm.open_time}
      />

      <div class="py-2" />
      <label for="close_time" class="text-sm pb-2 mt-6"> Close time* </label>
      <input
        class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
        id="close_time"
        placeholder="Enter close time"
        type="time"
        bind:value={$providerForm.close_time}
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

<style>
</style>
