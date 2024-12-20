"use client";

import { postsUrl } from "@/utils";
import { PostDetail } from "@/utils/model";
import React, { useEffect, useState } from "react";
import './posts.css';
import { useRouter } from "next/navigation";
// import { Head } from "next/document";
import Head from 'next/head';

const Posts: React.FC<{}> = () => {
    const [posts, setPosts] = useState<PostDetail[]>([]);
    const router = useRouter()

    useEffect(() => {
        fetch(postsUrl)
            .then((response) => response.json())
            .then((json: PostDetail[]) => setPosts(json));
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Head>
                <title>Post List</title>
                <meta name="description" content="A list of posts" />
                <meta property="og:title" content="Post List" />
                <meta property="og:description" content="A list of posts" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Post List" />
                <meta name="twitter:description" content="A list of posts" />
            </Head>
            <div className="header-container">
                <div style={{ fontSize: 24, color: "white", }}>Post List</div>
            </div>
            <div style={{ flex: 1, marginTop: 30 }}>
                <div className="container">
                    {posts.map(s => (
                        <div key={s.id} className="card" onClick={() => router.push(`/posts/${s.id}`)}>
                            <div>{`Post Id : ${s.id}`}</div>
                            <div style={{ fontWeight: 'bold' }}>{s.title}</div>
                            <div>{s.body}</div>
                            <div>{`User Id : ${s.userId}`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Posts;
