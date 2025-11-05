
export enum Sender {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
