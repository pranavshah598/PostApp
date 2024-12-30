"use client";
import { PostDetail } from "@/utils/model"
import { Card } from "../Card/Card"
import React from "react"
import { useRouter } from "next/navigation"

export const PostItem: React.FC<PostDetail> = (s: PostDetail) => {
    const router = useRouter();

    return (<Card id={s.id.toString()} onClick={() => router.push(`/posts/${s.id}`)}>
        <div>{`Post Id : ${s.id}`}</div>
        <div style={{ fontWeight: 'bold' }}>{s.title}</div>
        <div>{s.body}</div>
        <div>{`User Id : ${s.userId}`}</div>
    </Card>)
}
