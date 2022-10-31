
<script lang="ts">
  import Box from "components/layouts/Box.svelte";
  import { providerForm } from 'store'; 

  let avatar, fileinput;

  export const updatePrv = () => {}

  const onSubmit = () => {
    switch(true){
      case $providerForm.close_time == '': return alert("close time can't be empty") 
      case $providerForm.open_time == '': return alert("Open time can't be empty")
      case $providerForm.name == '': return alert("Name can't be empty")
      case $providerForm.location == '': return alert("Location can't be empty")
    }
    alert("update call ")
  }

  const uploadImage = () => {

    // storageRef.put(file).then(() => {
    // firebase.storage().ref("users").child(user.uid).getDownloadURL()
    //   .then((downloadURL) => {

    //   }
    // }
  }

  const onFileSelected = (e)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
        //  providerForm.set({
        //   name: $providerForm.name,
        //   location: $providerForm.location,
        //   image_id: e.target?.result,
        //   known_for: $providerForm.known_for,
        //   close_time: $providerForm.close_time,
        //   open_time: $providerForm.open_time,
        //   created_at: $providerForm.created_at 
        //  }) 
    };
  }

</script> 

<Box>
  <div class="overflow-y-scroll">
    <div class="w-screen py-4 px-4">
      <h1 class="w-full font-bold text-lg text-center">Update Provider</h1>
    </div>
    <form class="px-4 overflow-y-scroll">
      <label for="name" class="text-sm pb-2"> Name* </label>
      <input
          class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
          id="name"
          placeholder="Enter name"
          type="text"
          bind:value={$providerForm.name}
        />

      <div class="py-2"></div>  
      <label for="location" class="text-sm pb-2 pt-4"> Location* </label>
      <input
          class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
          id="location"
          placeholder="Enter location"
          type="text"
          bind:value={$providerForm.location}
        />  

      <div class="py-2"></div>  
      <label for="known_for" class="text-sm pb-2 pt-4"> Known for </label>
      <input
          class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
          id="known_for"
          placeholder="Enter known for"
          type="text"
          bind:value={$providerForm.known_for}
        />

      <div class="py-2"></div>  
      <label for="open_time" class="text-sm pb-2 pt-4"> Open time* </label>
      <input
          class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
          id="open_time"
          placeholder="Enter open time"
          type="text"
          bind:value={$providerForm.open_time}
        /> 

      <div class="py-2"></div>  
      <label for="close_time" class="text-sm pb-2 mt-6"> Close time* </label>
      <input
          class="border border-gray-300 inline appearance-none rounded w-full p-2
          leading-tight focus:outline-none text-sm pb-2"
          id="close_time"
          placeholder="Enter close time"
          type="text"
          bind:value={$providerForm.close_time}
        />

      <div class ="py-2"></div>
      <img class="upload w-12 h-12 inline" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />  
      <span class="chan text-sm pl-2" on:click={()=>{fileinput.click();}}>Choose Image</span>
      <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >

      <div class="py-4"></div>  
      <button on:click={onSubmit} class="w-full bg-sky-400 rounded text-white items-center justify-center py-2">Submit</button>

    </form>
  </div>
</Box>

<style>

</style>
