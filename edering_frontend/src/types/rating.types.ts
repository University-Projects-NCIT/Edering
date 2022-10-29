export interface IRating {
  id?: number;
  rating?: string;
  created_at?: string;
  from_id?: IRatingFrom;
  to_id: IRatingTo;
}

export interface IRatingFrom {
  id?: string;
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
