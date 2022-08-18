import { useState, type FC } from 'react';
import { useAppSelector } from 'src/app/hooks';
import type { Post } from '../../types';
import { useRemovePostMutation } from 'src/features/posts/api/posts';
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
  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const { accessToken, id: userId } = useAppSelector(
    (state) => state.auth.signin
  );

  const [removePost, { error, isLoading, isSuccess }] = useRemovePostMutation();

  const onClickRemoveButton = () => {
    removePost({
      accessToken: accessToken as string,
      id: post.id,
    });
  };

  return (
    <>
      <div className={styles.postItemContainer}>
        {error && <p>{JSON.stringify(error)}</p>}
        <div>
          {post.id} : {post.content}
        </div>
        <div className={styles.buttonArea}>
          {userId === post.author.id && (
            <button onClick={onClickRemoveButton} disabled={isLoading}>
              削除
            </button>
          )}
        </div>
      </div>
    </>
  );
};
