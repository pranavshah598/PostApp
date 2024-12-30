import { postsUrl } from "@/utils";
import { PostDetail } from "@/utils/model";
import React from "react";
import { Metadata } from "next";
import { PostItem } from "@/components/PostItem/PostItem";
import './posts.css';


interface PostListProps {
    posts: PostDetail[];
}

export const metadata: Metadata = {
    title: 'Post List',
    description: 'A list of posts',
    openGraph: {
        title: 'Post List',
        description: 'A list of posts',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Post List',
        description: 'A list of posts',
    },
};

const Posts: React.FC<PostListProps> = async () => {
    const posts = await postList();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="header-container">
                <div style={{ fontSize: 24, color: "white", }}>Post List</div>
            </div>
            <div style={{ flex: 1, marginTop: 30 }}>
                <div className="container">
                    {posts.map(s => (<PostItem {...s} />))}
                </div>
            </div>
        </div>
    )
}

export const postList = async () => {
    const response = await fetch(postsUrl);
    const posts: PostDetail[] = await response.json();
    return posts;
};

export default Posts;
