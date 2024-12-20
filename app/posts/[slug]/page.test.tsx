// app/posts/[slug]/page.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import  Page  from './page';
import { describe, it } from 'node:test';

jest.mock('@/utils/model', () => ({
  PostDetail: {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'This is a test post',
  },
}));

jest.mock('@/utils', () => ({
  postsUrl: 'https://example.com/posts',
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Page component', () => {
  it('renders post title and body', async () => {
    const params = Promise.resolve({ slug: 'test-post' });
    const { getByText } = render(<Page params={params} />);
    await waitFor(() => expect(getByText('Test Post')).toBeDefined());
    await waitFor(() => expect(getByText('This is a test post')).toBeDefined());
  });

  it('renders meta tags', async () => {
    const params = Promise.resolve({ slug: 'test-post' });
    const { getByTitle } = render(<Page params={params} />);
    await waitFor(() => expect(getByTitle('Post Detail - Test Post')).toBeDefined());
  });
});
