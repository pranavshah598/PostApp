import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Posts from './page';
import { PostDetail } from '@/utils/model';
import { useRouter } from 'next/navigation';

jest.mock('@/utils', () => ({
    postsUrl: 'https://example.com/posts',
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Posts component', () => {
    it('renders with empty posts array', () => {
        const { getByText } = render(<Posts />);
        expect(getByText('Post List')).toBeDefined();
        expect(getByText('No posts available')).not.toBeDefined();
    });

    it('renders with populated posts array', async () => {
        const posts: PostDetail[] = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
        ];

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(posts),
            }) as Promise<Response>
        );

        const { getAllByRole } = render(<Posts />);
        await waitFor(() => expect(getAllByRole('listitem')).toHaveLength(2));
        expect(getAllByRole('listitem')[0]).toBe('Post Id : 1');
    });

    it('renders post list', async () => {
        const posts: PostDetail[] = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
        ];

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(posts),
            }) as Promise<Response>
        );

        const { getAllByRole } = render(<Posts />);
        await waitFor(() => expect(getAllByRole('listitem')).toHaveLength(2));
        expect(getAllByRole('listitem')[0]).toBe('Post Id : 1');
        expect(getAllByRole('listitem')[1]).toBe('Post Id : 2');
    });

    it('renders post item', async () => {
        const posts: PostDetail[] = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        ];

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(posts),
            }) as Promise<Response>
        );

        const { getByText } = render(<Posts />);
        await waitFor(() => expect(getByText('Post Id : 1')).toBeDefined());
        expect(getByText('Post 1')).toBeDefined();
        expect(getByText('Body 1')).toBeDefined();
        expect(getByText('User Id : 1')).toBeDefined();
    });

    it('handles post item click event', async () => {
        const posts: PostDetail[] = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        ];

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(posts),
            }) as Promise<Response>
        );

        const { getByText } = render(<Posts />);
        await waitFor(() => expect(getByText('Post Id : 1')).toBeDefined());
        const postItem = getByText('Post Id : 1');
        fireEvent.click(postItem);
        expect(useRouter().push).toHaveBeenCalledTimes(1);
        expect(useRouter().push).toHaveBeenCalledWith('/posts/1');
    });
});
