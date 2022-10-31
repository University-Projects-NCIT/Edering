import { writable } from "svelte/store";

const providerState = {
  name: '',
  location: '',
  image_id: '',
  known_for: '',
  open_time: '',
  close_time: '',
  created_at: Date.now(),
};

export const providerForm = writable(providerState)