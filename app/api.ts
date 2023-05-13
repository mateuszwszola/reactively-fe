export const API_URL = "http://localhost:3000";

export type ApiError = {
  message: string | string[];
  path: string;
  method: string;
  timestamp: string;
};

export type ResponseBody<DataType = unknown> = {
  status: number;
  data: DataType;
  errors: ApiError[] | null;
};

export interface AccessTokenPayload {
  username: string;
  sub: number;
  id_user: number;
  email: string;
  iat: number;
  exp: number;
}

// Mocks
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
