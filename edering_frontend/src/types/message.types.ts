export interface IMessage {
  id: String;
  msg: String;
  accepted: Boolean,
  declined: Boolean,
  canceled: Boolean,
  createdAt: Date;
  sender: String;
  receiver: String;
  type: String;
}
