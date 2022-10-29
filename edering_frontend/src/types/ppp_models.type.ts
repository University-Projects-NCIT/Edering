export interface Provider{
  id: String,
  name: String,
  location: String,
  image_id: String,
  known_for: String,
  open_time: String,
  close_time: String,
  created_at: Number,
  food_categories?: FoodCategory[],
  comments?: Comment[],
  ratings?: Rating[],
  provider_order?: Order[],
}

export interface Customer{
  id: String,
  customer_order?: Order[],
  user_scan?: UserScan[]
}

export interface FoodCategory{
  id: String,
  c_name: String,
  image_id: String,
  provider: String, // provider id 
  menus?: Menu[],
}

export interface Menu{
  id: String,
  name: String,
  price: String 
}

export interface Comment{
  id: String,
  content: String,
  created_at: String, //date and time 
  comment_from: String, // Customer id 
  comment_to: String // provider id 
}

export interface Rating{
  id?: Number,
  rating: String,
  created_at: String, // datetime 
  from_id: String, // customer id 
  to_id: String // provider id 
}

export interface Order{
  id: String,
  food_name: String,
  food_count: Number,
  order_date_time: String,
  order_status?: String,
  order_cost: String,
  order_from: String, // customer id 
  order_to: String // provider id 
}

export interface UserScan{
  id?: Number,
  scan_url: String,
  date_time: String,
  customer_id: String
}