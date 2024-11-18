export interface UserInfo {
  id: string;
  name: string;
}
export interface Message {
  id: string;
  user: {
    id: string;
    name: string;
  };
  content: string;
  chatroom_id: string;
  created_at: Date;
  user_id: string;
  timestamp: Date;
}
export interface Chatroom {
  id: string;
  name: string;
  description?: string;
  users: UserInfo[];
  createdAt: Date;
  updatedAt: Date;
}
