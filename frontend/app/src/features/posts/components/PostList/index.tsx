import { useState, type FC } from 'react';
import type { Post } from '../../types';
import styles from './style.module.css';

type PostListProps = {
  posts: Post[];
};
type PostItemProps = {
  post: Post;
};

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <div>
      {post.id} : {post.content}
    </div>
  );
};
