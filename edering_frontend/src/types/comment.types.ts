export interface ICommentFrom {
  id?: string;
}

export interface ICommentTo {
  id?: string;
  name?: string;
  location?: string;
  image_id?: string;
  known_for?: string;
  open_time?: string;
  close_time?: string;
  created_at?: string;
}

export interface IComment {
  id?: string;
  content?: string;
  created_at?: string;
  comment_from?: ICommentFrom;
  comment_to?: ICommentTo;
}
