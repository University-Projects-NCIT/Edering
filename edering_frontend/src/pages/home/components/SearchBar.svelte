<script lang="ts">
  import Input from 'components/input_components/Input.svelte';
  import type { HTMLInput } from 'types/input.types';

  const handleInput = (e: HTMLInput) => {
    console.log(e.currentTarget.value);
  };
</script>

<Input {handleInput} placeholder="Search hotels, restaurants..." />
