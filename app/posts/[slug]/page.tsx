import { postsUrl } from "@/utils";
import { PostDetail } from "@/utils/model";
import React from "react";
import { Card } from "@/components/Card/Card";
import { Metadata } from "next";
import '../posts.css';

type Props = {
    params: Promise<{ slug: string }>
}



export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const postDetail = await getpostDetail((await params).slug);

    return {
        title: postDetail.title,
        description: postDetail.body,
        openGraph: {
            title: postDetail.title,
            description: postDetail.body,
        },
        twitter: {
            title: postDetail.title,
            description: postDetail.body,
        },
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {


    const postDetail = await getpostDetail((await params).slug);

    return <div>
        <div className="header-container">
            <div style={{ fontSize: 24, color: "white", }}>Post Detail</div>
        </div>
        {postDetail && <Card containerStyle={{ padding: 30, marginTop: 30, marginInline: 30 }}>
            <div>{`Post Id : ${postDetail.id}`}</div>
            <div style={{ fontWeight: 'bold' }}>{`Title : ${postDetail.title}`}</div>
            <div>{`Body : ${postDetail.body}`}</div>
            <div>{`User Id : ${postDetail.userId}`}</div>
        </Card>}
    </div>
}

export const getpostDetail = async (id: string) => {
    const response = await fetch(`${postsUrl}/${id}`);
    const postDetail: PostDetail = await response.json();
    return postDetail;
};
