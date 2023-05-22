import {
    Button,
    Paper,
    Textarea,
    TextInput,
    Title,
    MultiSelect,
} from "@mantine/core";
import type {ActionArgs, LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Form, useLoaderData} from "@remix-run/react";
import {fetchFromApi} from "~/client";
import {requireUserSession} from "~/http";
import type {ResponseBody} from "~/types/api";
import {API_URL} from "~/types/api";
import React from "react";

export async function loader({request}: LoaderArgs) {
    const { accessToken } = await requireUserSession(request);

    console.log('accessToken', accessToken);

    const fetcher = await fetchFromApi(request);

    const tagsResponse = await fetcher("/tag");

    const {data: tags} = (await tagsResponse.json()) as ResponseBody<
        { id_tag: number; name: string }[]
    >;

    return json({
        tags,
    });
}

export async function action({request}: ActionArgs) {
    const {accessToken, userId} = await requireUserSession(request);

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const tags = formData.get("tags") || [];

    const formattedTags = typeof tags === "string" ? tags.split(",") : [];

    const apiResponse = await fetch(API_URL + "/post", {
        method: "POST",
        body: JSON.stringify({
            id_user: userId,
            title,
            content,
            tags: formattedTags.map((tag) => Number(tag)),
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!apiResponse.ok) {
        throw new Response(null, {
            status: apiResponse.status || 500,
        });
    }

    return redirect("/posts");
}

export default function PostPage() {
    const {tags} = useLoaderData<typeof loader>();

    return (
        <div>
            <Title>New Post</Title>

            <Paper
                component={Form}
                method="post"
                radius={0}
                p={30}
                maw={720}
                mx="auto"
            >
                <MultiSelect
                    data={tags.map((tag) => ({
                        value: String(tag.id_tag),
                        label: tag.name,
                    }))}
                    label="Select tags"
                    placeholder="Pick all that you like"
                    name="tags"
                />

                <TextInput
                    mt={16}
                    name="title"
                    label="Post title"
                    placeholder="Enter post title"
                    size="md"
                />

                <Textarea
                    mt={16}
                    name="content"
                    label="Post content"
                    placeholder="Enter post content"
                    minRows={10}
                />

                <Button type="submit" fullWidth mt="xl" size="md">
                    Create Post
                </Button>
            </Paper>
        </div>
    );
}

export function ErrorBoundary({ error }: { error: unknown }) {
    console.error(error);
    return (
        <div>
            <h1>Oh no!</h1>
            <p>Something went wrong when creating a new post.</p>
        </div>
    );
}
