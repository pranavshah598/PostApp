"use client";
import { postsUrl } from "@/utils";
import { PostDetail } from "@/utils/model";
import React, { useEffect, useState } from "react"
import '../posts.css';
import Head from "next/head";
export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    // const [id, setId] = useState<string | undefined>(undefined)
    const [postDetal, setPostDetal] = useState<PostDetail | undefined>(undefined)
    useEffect(() => {
        params.then((p) => {
            fetch(`${postsUrl}/${p.slug}`)
                .then((response) => response.json())
                .then((res: PostDetail) => setPostDetal(res));
        });
    }, [])

    return <div>
        {postDetal && <Head>
            <title>{`Post Detail - ${postDetal.title}`}</title>
            <meta name="description" content={postDetal.body} />
            <meta property="og:title" content={postDetal.title} />
            <meta property="og:description" content={postDetal.body} />
        </Head>}
        <div className="header-container">
            <div style={{ fontSize: 24, color: "white", }}>Post Detail</div>
        </div>
        {postDetal && <div key={postDetal.id} className="card" style={{ padding: 30, marginTop: 30, marginInline: 30 }}>
            <div>{`Post Id : ${postDetal.id}`}</div>
            <div style={{ fontWeight: 'bold' }}>{`Title : ${postDetal.title}`}</div>
            <div>{`Body : ${postDetal.body}`}</div>
            <div>{`User Id : ${postDetal.userId}`}</div>
        </div>}
    </div>
}
