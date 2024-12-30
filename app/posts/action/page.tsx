'use client';
import { postsUrl } from "@/utils";
import { PostDetail } from "@/utils/model";
import { useEffect, useState } from "react";
import '../posts.css';
import './action.css';
import { Card } from "@/components/Card/Card";
import { useSearchParams } from "next/navigation";

export const Action: React.FC<{}> = () => {

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [postId, setPostId] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams()
    useEffect(() => {
        const postid = searchParams.get('id');
        if (postid) {
            setPostId(postid);
        }
    }, [])
    useEffect(() => {
        if (postId) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setBody(data.body);
                })
                .catch(error => console.error(error));
        }
    }, [postId])


    const addPost = async (data: Omit<PostDetail, 'id'>) => {
        const response = await fetch(postsUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                body: data.body,
                userId: data.userId,
            })
        });
        setTitle('');
        setBody('');
        setPostId(undefined);
        const postDetail: PostDetail = await response.json();
        return postDetail;
    };

    const updatePost = async (data: Omit<PostDetail, 'id'>) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: data.title,
                    body: data.body,
                    userId: data.userId,
                    id: postId,
                })
            });
            setTitle('');
            setBody('');
            setPostId(undefined);
            const postDetail: PostDetail = await response.json();
            return postDetail;

        } catch (error) {
            console.error(error);
        }

    };

    return <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="header-container">
            <div style={{ fontSize: 24, color: "white", }}>Post Action</div>
        </div>
        <Card containerStyle={{ marginInline: '10%', marginTop: 30 }}>
            <form style={{ padding: 20, display: "flex", flexDirection: "column" }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="labeltext">Title</div>
                    <input
                        type="text"
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    <div className="labeltext">Description</div>
                    <textarea
                        value={body}
                        className="input"
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                    />
                </div>

                {postId === undefined && <button type="button" className="action-btn" onClick={() => addPost({ title, body, userId: 1 })}>Add Post</button>}
                {postId && (
                    <button type="button" className="action-btn" onClick={() => updatePost({ title, body, userId: 1 })}>Update Post</button>
                )}
            </form>
        </Card>
    </div>
}

export default Action;
