export interface UserData {
  id?: number;
  username: string;
  password: string;
  contacts: string[];
}

export interface Message {
  id?: number;
  sender: string;
  text: string;
  createdAt?: string;
}

export interface ChatUserData {
  id: number;
  username: string;
}

export interface Chat {
  id?: number;
  user1: string;
  user2: string;
  messages: Message[];
}
