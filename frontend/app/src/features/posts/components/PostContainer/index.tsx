import { useState, type FC } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useFindPostsQuery } from 'src/features/posts/api/posts';
import { PostList } from '../PostList';

export const PostContainer: FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth.signin);
  const [cursorId, setCursorId] = useState<number | undefined>();

  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const { data, error, isFetching, isLoading } = useFindPostsQuery({
    accessToken: accessToken as string,
    cursorId,
  });

  console.log({
    isFetching,
    isLoading,
    data,
    error,
  });

  if (isFetching) {
    return <p>Fetching...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error発生（一度ログアウトしてください）</p>;
  }

  if (!data) {
    return <p>data無し</p>;
  }

  return (
    <div>
      <p>トータル {data.total}件</p>
      <PostList posts={data.data} />
    </div>
  );
};
