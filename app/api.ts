export interface Author {
  id: string;
  login: string;
  image: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  comments: string[];
  likes: string[];
  author: Author;
  createdAt: string;
  updatedAt: string;
}
