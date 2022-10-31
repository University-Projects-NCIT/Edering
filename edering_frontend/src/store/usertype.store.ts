import { writable, Writable } from "svelte/store";
import type { UserType } from "types/UserType";

export const userType: Writable<UserType> = writable('None')