import { writable } from "svelte/store"
import type { Customer, Order } from "types"

const customerState: Customer = {
  id: '',
  customer_order: [],
  user_scan: []
}

export const customer = writable(customerState)