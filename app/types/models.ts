/**
 * Model User
 *
 */
export type User = {
  id_user: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model UserDetails
 *
 */
export type UserDetails = {
  id_user_details: number;
  bio: string | null;
  id_user: number;
  id_image: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model UserTag
 *
 */
export type UserTag = {
  id_user: number;
  id_tag: number;
};

/**
 * Model Image
 *
 */
export type Image = {
  id_image: number;
  path: string;
  createdAt: Date;
};

/**
 * Model Post
 *
 */
export type Post = {
  id_post: number;
  content: string;
  title: string | null;
  id_user: number;
  id_image: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model PostLike
 *
 */
export type PostLike = {
  id_post_like: number;
  id_post: number;
  id_user: number;
  createdAt: Date;
};

/**
 * Model CommentLike
 *
 */
export type CommentLike = {
  id_comment_like: number;
  id_user: number;
  id_comment: number;
  createdAt: Date;
};

/**
 * Model Comment
 *
 */
export type Comment = {
  id_comment: number;
  id_post: number;
  id_user: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model PostTag
 *
 */
export type PostTag = {
  id_post: number;
  id_tag: number;
};

/**
 * Model Tag
 *
 */
export type Tag = {
  id_tag: number;
  name: string;
};
