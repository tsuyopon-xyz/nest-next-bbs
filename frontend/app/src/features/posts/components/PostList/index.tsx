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
  const { id: userId } = useAppSelector((state) => state.auth.signin);

  const [removePost, { error, isLoading }] = useRemovePostMutation();

  const onClickRemoveButton = () => {
    removePost({
      id: post.id,
    });
  };

  return (
    <>
      <div className={styles.postItemContainer}>
        {error && <p>{JSON.stringify(error)}</p>}
        <div className={styles.postItemHeader}>
          <div className={styles.postAuthorName}>{post.author.name}</div>
          <div className={styles.postTime}>
            {formatDiffDateOnPost(post.createdAt)}
          </div>
        </div>
        <div className={styles.postItemContent}>
          {replaceHttpLinkTextToLinkable(post.content)}
        </div>
        <div className={styles.postItemFooter}>
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
