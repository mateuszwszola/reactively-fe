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
