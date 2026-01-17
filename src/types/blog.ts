export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  createdAt?: string;
  coverImage?: string;
}
