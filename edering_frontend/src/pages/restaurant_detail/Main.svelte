<script lang="ts">
  import Input from 'components/input_components/Input.svelte';
  import Box from 'components/layouts/Box.svelte';
  import type { IFoodCategory } from 'types/foodCategory.types';
  import TopNav from './components/TopNav.svelte';

  const foodCategories: IFoodCategory[] = [
    {
      id: '1',
      c_name: 'Momo',
      image_uri_id:
        'https://media.istockphoto.com/photos/japanese-dumplings-gyoza-with-pork-meat-and-vegetables-picture-id1133151212?k=20&m=1133151212&s=612x612&w=0&h=UO9ZhFWOSx9y_ISDp6auBmma3GiQd4yWpMdqo3O2TMo=',
    },
    {
      id: '2',
      c_name: 'Burger',
      image_uri_id:
        'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?b=1&k=20&m=1254672762&s=170667a&w=0&h=nKrG40G2jj9O8wzJ8wDD2zmUKNp00mcdVWK_f_zixug=',
    },
    {
      id: '3',
      c_name: 'Pizza',
      image_uri_id:
        'https://thumbs.dreamstime.com/b/pizza-pepperoni-cheese-salami-vegetables-58914487.jpg',
    },
    {
      id: '4',
      c_name: 'Deserts',
      image_uri_id:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fupdated_main_images%2F0709p192b-peanut-butter-pie-x.jpg%3Fitok%3DH_vb-QN3',
    },
    {
      id: '5',
      c_name: 'Fries',
      image_uri_id:
        'https://ministryofcurry.com/wp-content/uploads/2021/06/air-fryer-sweet-potatoes_-6-500x375.jpg',
    },
    {
      id: '6',
      c_name: 'Stick Foods',
      image_uri_id:
        'https://images.squarespace-cdn.com/content/v1/53ecd1bde4b0a6f9524254f8/1568978332751-S0MQASS04VHMX52WTZNI/must-have-stick-foods.jpg?format=2500w',
    },
  ];

  let navItems = ['Menu', 'About', 'Comments', 'Chats'];

  let hotelImgUrl =
    'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1';
</script>

<Box className="pb-12">
  <img class="banner-img w-full" src={hotelImgUrl} alt="" />
  <!-- detail container -->
  <Box className="px-2">
    <!-- //topnav -->
    <Box className="mt-2">
      <TopNav {navItems} />
    </Box>
    <!-- //search bar -->
    <Box className="mt-3">
      <Input placeholder="Search foods..." />
    </Box>

    <Box className="flex mt-2">
      <h3 class="text-base text-black-primary font-bold">Eatme</h3>
      <Box
        className="rounded-full bg-yellow-primary mt-1"
        style="width: 0.4rem; height: 0.4rem;"
      />
    </Box>

    <Box
      flow="horizontal"
      justify="center"
      align="center"
      className="flex-wrap gap-4 mt-4"
    >
      <!-- food categories list -->
      {#each foodCategories as category}
        <Box
          className="bg-gray-primary rounded-3xl p-4 text-center hover:cursor-pointer food-category"
        >
          <img
            class="w-20 h-16 rounded-2xl"
            src={category?.image_uri_id ?? ''}
            alt=""
          />
          <p class="text-xs text-black-primary font-medium">
            {category?.c_name}
          </p>
        </Box>
      {/each}
    </Box>
  </Box>
</Box>

<style>
  .banner-img {
    aspect-ratio: 2/1;
  }

  :global(.food-category:hover p) {
    color: #ffa800;
  }
</style>
