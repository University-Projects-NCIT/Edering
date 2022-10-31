<script lang="ts">
  import Input from 'components/input_components/Input.svelte';
  import type { HTMLInput } from 'types/input.types';

  export let value = '';
  export let handleInput: (e: HTMLInput) => void;
  export let handleSearchSubmit: () => void;
</script>

<form on:submit|preventDefault={handleSearchSubmit}>
  <Input {value} {handleInput} placeholder="Search hotels, restaurants..." />
</form>
