<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import BarLoading from 'components/loading/BarLoading.svelte';
  import { storage } from 'config/conn_firebase';
  import { request } from 'helper';
  import { menuStore, user_store } from 'store';
  import { foodCategoryStore } from 'store/foodCategory.store';
  import { ApiRequestMethods, IMenu } from 'types';

  let fileinput;
  let isLoading = false;

  $: userId = $user_store.id;

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
            $foodCategoryStore.image_id = url;
          });
      }
    );
  };
  const onFoodCategorySubmit = async () => {
    // api call
    isLoading = true;
    const response: IMenu = await request({
      url: `/food_categories/`,
      method: ApiRequestMethods.post,
      data: {
        provider: userId,
        c_name: $foodCategoryStore.c_name,
        image_id: $foodCategoryStore.image_id,
      },
    });
    isLoading = false;
    window.history.back();
  };
</script>

<Box>
  <div class="overflow-y-scroll">
    <div class="w-screen py-4 px-4">
      <h1 class="w-full font-bold text-lg text-center">Add Food Category</h1>
    </div>
    <form
      on:submit|preventDefault={onFoodCategorySubmit}
      class="px-4 overflow-y-scroll"
    >
      <Box className="pb-2">
        <img
          class="w-20 h-20 rounded-md mb-2 m-auto"
          src={$foodCategoryStore.image_id != ''
            ? $foodCategoryStore.image_id
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
        bind:value={$foodCategoryStore.c_name}
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
