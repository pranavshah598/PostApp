"use client";
import { PostDetail } from "@/utils/model"
import { Card } from "../Card/Card"
import React from "react"
import { useRouter } from "next/navigation";
import '../../app/posts/action/action.css';

export const PostItem: React.FC<PostDetail> = (s: PostDetail) => {
    const router = useRouter();

    return (<Card id={s.id.toString()} onClick={() => {
        router.push(`/posts/${s.id}`)
    }}>
        <div>{`Post Id : ${s.id}`}</div>
        <div style={{ fontWeight: 'bold' }}>{s.title}</div>
        <div>{s.body}</div>
        <div>{`User Id : ${s.userId}`}</div>
        <button className="action-btn" onClick={(e) => {
            router.push(`/posts/action?id=${s.id}`);
            e.stopPropagation();
        }}>Update</button>
    </Card>)
}
