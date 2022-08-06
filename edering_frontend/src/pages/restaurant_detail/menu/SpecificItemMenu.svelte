<script lang="ts">
  import Box from 'components/layouts/Box.svelte';
  import type { IMenu } from 'types/menu.types';

  let menu: IMenu[] = [
    {
      id: '1',
      category: 'Momo',
      name: 'Chicken Steam Momo',
      price: '210',
      image_uri_id:
        'https://10minutesrecipe.com/wp-content/uploads/2021/08/Chicken-Momo-Recipe-At-Home.jpg',
    },
    {
      id: '2',
      category: 'Momo',
      name: 'Chicken C Momo',
      price: '240',
      image_uri_id:
        'https://www.blackforestnepal.com/public/832-832/files/42089DF000B5CBB-chicken%20c%20momo.jpg',
    },
    {
      id: '3',
      category: 'Momo',
      name: 'Veg Steam Momo',
      price: '190',
      image_uri_id:
        'https://c.ndtvimg.com/2022-07/9lta8l_veg-momo_120x90_06_July_22.png',
    },
    {
      id: '4',
      category: 'Momo',
      name: 'Veg C Momo',
      price: '200',
      image_uri_id:
        'https://www.eeatit.com/wp-content/uploads/2020/10/chilli.jpg',
    },
  ];

  let data: object = {
    chicken: [],
    veg: [],
  };

  menu.forEach(item => {
    console.log('yoo');
    if (item.name?.includes('Chicken')) {
      data['chicken'] = [
        ...data['chicken'],
        {
          ...item,
          name: item.name.replace('Chicken', '').trim(),
          price: `Rs.${item.price}`,
        },
      ];
    }
    if (item.name?.includes('Veg')) {
      data['veg'] = [
        ...data['veg'],
        {
          ...item,
          name: item.name.replace('Veg', '').trim(),
          price: `Rs.${item.price}`,
        },
      ];
    }
  });
  console.log('menudata', data);
</script>

<Box className="pt-5 px-2 space-y-2 pb-11">
  <h1 class="text-base font-bold text-center">Momo</h1>
  <!-- chicken -->
  <Box className="">
    <h3 class="text-sm font-bold">Chicken</h3>
    <!-- chicken items card container -->
    <Box className="space-y-2">
      {#each data['chicken'] ?? [] as item}
        <Box flow="horizontal" className="bg-gray-primary rounded-3xl p-4 ">
          <img
            class="w-20 h-16 rounded-2xl"
            src={item?.image_uri_id ?? ''}
            alt=""
          />
          <Box className="px-3 space-y-2 flex-1">
            <h4 class="text-xs font-medium">
              {item?.name}
            </h4>
            <Box flow="horizontal" align="center" justify="between">
              <p class="text-xs text-yellow-primary font-medium">
                {item?.price}
              </p>
              <Box>
                <p
                  class="bg-yellow-primary text-white leading-4 w-4 text-center rounded-full"
                >
                  +
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      {/each}
    </Box>
  </Box>
  <!-- veg -->
  <Box className="">
    <h3 class="text-sm font-bold">Veg</h3>
    <Box className="space-y-2">
      {#each data['veg'] ?? [] as item}
        <Box flow="horizontal" className="bg-gray-primary rounded-3xl p-4 ">
          <img
            class="w-20 h-16 rounded-2xl"
            src={item?.image_uri_id ?? ''}
            alt=""
          />
          <Box className="px-3 space-y-2 flex-1">
            <h4 class="text-xs font-medium">
              {item?.name}
            </h4>
            <Box flow="horizontal" align="center" justify="between">
              <p class="text-xs text-yellow-primary font-medium">
                {item?.price}
              </p>
              <Box>
                <p
                  class="bg-yellow-primary text-white leading-4 w-4 text-center rounded-full"
                >
                  +
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      {/each}
    </Box>
  </Box>
</Box>
