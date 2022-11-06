export interface IRating {
  id?: number;
  rating?: string;
  created_at?: string;
  rating_from?: IRatingFrom;
  rating_to: IRatingTo;
}

export interface IRatingFrom {
  id?: string;
  name?: string;
  email?: string;
  profile_image?: string;
}

export interface IRatingTo {
  id?: string;
  name?: string;
  location?: string;
  image_id?: string;
  known_for?: string;
  open_time?: string;
  close_time?: string;
  created_at?: string;
}
