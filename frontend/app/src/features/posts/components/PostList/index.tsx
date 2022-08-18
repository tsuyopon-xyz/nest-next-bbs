import type { FC } from 'react';
import reactStringReplace from 'react-string-replace';
import { useAppSelector } from 'src/app/hooks';
import type { Post } from '../../types';
import { useRemovePostMutation } from 'src/features/posts/api/posts';
import { formatDiffDateOnPost } from 'src/utils/date';
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
          <div>{post.author.name}</div>
          <div>{formatDiffDateOnPost(post.createdAt)}</div>
        </div>
        <hr />
        <div>{replaceHttpLinkTextToLinkable(post.content)}</div>
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

// https://github.com/iansinnott/react-string-replace#multiple-replacements-on-a-single-string
const replaceHttpLinkTextToLinkable = (text: string) => {
  return reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
    <a key={match + i} href={match} target="_blank" rel="noreferrer">
      {match}
    </a>
  ));
};
