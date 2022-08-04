<script>
  import Input from 'components/input_components/Input.svelte';
  import Box from 'components/layouts/Box.svelte';
  import Body from 'components/typography/Body.svelte';
  import { each } from 'svelte/internal';
  import BottomNav from './components/BottomFixedNav.svelte';

  let data = [
    {
      imgUrl:
        'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1',
      name: 'The Burger House and Crunchy Fried Chicken',
      location: 'Mid-Baneshwor, Kathmandu',
      opensAt: '10:00AM',
      closesAt: '9:00PM',
      rating: 5,
    },
    {
      imgUrl:
        'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1',
      name: 'The Burger House and Crunchy Fried Chicken',
      location: 'Mid-Baneshwor, Kathmandu',
      opensAt: '10:00AM',
      closesAt: '9:00PM',
      rating: 5,
    },
    {
      imgUrl:
        'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1',
      name: 'The Burger House and Crunchy Fried Chicken',
      location: 'Mid-Baneshwor, Kathmandu',
      opensAt: '10:00AM',
      closesAt: '9:00PM',
      rating: 5,
    },
    {
      imgUrl:
        'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1',
      name: 'The Burger House and Crunchy Fried Chicken',
      location: 'Mid-Baneshwor, Kathmandu',
      opensAt: '10:00AM',
      closesAt: '9:00PM',
      rating: 5,
    },
    {
      imgUrl:
        'https://lh3.googleusercontent.com/p/AF1QipNWwQYU9l-pR7WFY6ZjIwplIiYa4eA7tMX_4wJy=w768-h768-n-o-v1',
      name: 'The Burger House and Crunchy Fried Chicken',
      location: 'Mid-Baneshwor, Kathmandu',
      opensAt: '10:00AM',
      closesAt: '9:00PM',
      rating: 5,
    },
  ];
</script>

<!-- container -->
<Box className="p-4 space-y-3 relative mb-8">
  <!-- input component -->
  <Input placeholder="Search hotels, restaurants..." />
  <!-- hotels list container -->
  <Box>
    <Box flow="horizontal" align="center" className="py-2">
      <img class="w-4" src="icons/location.svg" alt="location" />
      <Body>Near by you</Body>
    </Box>

    <Box className="space-y-3">
      {#each data as item}
        <Box flow="horizontal" className="rounded-l-2xl">
          <!-- image -->
          <Box className="flex w-2/5 rounded-l-2xl">
            <img src={item.imgUrl} alt="" class="rounded-l-2xl" />
          </Box>

          <!-- content -->
          <Box
            className="bg-gray-primary rounded-r-2xl px-2  py-4 w-3/5 space-y-3"
          >
            <h1 style="font-size: 0.7rem;" class="title leading-3 font-medium">
              {item.name}
            </h1>

            <Box className="space-y-1">
              <!-- location and icon -->
              <Box flow="horizontal" align="center" className="space-x-1">
                <img class="w-3" src="/icons/location.svg" alt="" />
                <Body
                  style="font-size: 0.6rem; line-height: 0.6rem"
                  className="location-name"
                >
                  {item.location}</Body
                >
              </Box>

              <!-- time and icon -->
              <Box
                flow="horizontal"
                align="center"
                className="space-x-1 ml-icon"
              >
                <img class="w-2" src="/icons/time.svg" alt="" />
                <Body
                  style="font-size: 0.6rem; line-height: 0.6rem"
                  className="time"
                >
                  {item.opensAt} - {item.closesAt}</Body
                >
              </Box>

              <Box flow="horizontal" className="ml-icon">
                {#if item.rating > 0}
                  {#each [...Array(item.rating).keys()] as num}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height=""
                      viewBox="0 0 51 48"
                      class="star"
                    >
                      <defs>
                        <style>
                          .starPath {
                            fill: #ffa800;
                          }
                        </style>
                      </defs>
                      <path
                        class="starPath"
                        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                      />
                    </svg>
                  {/each}
                {/if}
              </Box>
            </Box>
          </Box>
        </Box>
      {/each}
    </Box>
  </Box>
</Box>

<style>
  @media (min-width: 330px) {
    .title {
      font-size: 1rem !important;
      line-height: 1.2rem !important;
    }

    :global(.location-name) {
      font-size: 0.8rem !important;
      line-height: 1rem !important;
    }

    :global(.time) {
      font-size: 0.8rem !important;
      line-height: 1rem !important;
    }
  }

  :global(.ml-icon) {
    margin-left: 0.1rem;
  }
</style>
