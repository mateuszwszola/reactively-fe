import { z } from "zod";

export const userDetailsSchema = z.object({
  id_user_details: z.number(),
  bio: z.string().nullable(),
  id_user: z.number(),
  id_image: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userSchema = z.object({
  id_user: z.number(),
  username: z.string(),
  details: userDetailsSchema.nullable(),
});

export const commentSchema = z.object({
  id_comment: z.number(),
  id_post: z.number(),
  id_user: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const postLikeSchema = z.object({
  id_post_like: z.number(),
  id_post: z.number(),
  id_user: z.number(),
  createdAt: z.string(),
});

export const postTagSchema = z.object({
  id_post_tag: z.number(),
  id_post: z.number(),
});

export const postSchema = z.object({
  id_post: z.number(),
  content: z.string(),
  title: z.string(),
  id_user: z.number(),
  id_image: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userSchema,
  comments: commentSchema.array(),
  likes: z.array(
    z.object({
      user: z.object({
        id_user: z.number(),
        username: z.string(),
        details: userDetailsSchema.nullable(),
      }),
    })
  ),
  tags: postTagSchema.array(),
});
