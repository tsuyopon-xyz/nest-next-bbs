import { useState, type FC, type MouseEventHandler } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useFindPostsQuery } from 'src/features/posts/api/posts';
import { PostList } from '../PostList';

const TAKE = 10;

export const PostContainer: FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth.signin);
  const [cursorId, setCursorId] = useState<number | undefined>();

  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const { data, error, isFetching, isLoading } = useFindPostsQuery({
    accessToken: accessToken as string,
    cursorId,
    take: TAKE,
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
      {data.data.length === TAKE ? (
        <ReadMore
          onClick={() => {
            const lastPostInData = data.data[data.data.length - 1];
            setCursorId(lastPostInData.id);
          }}
        />
      ) : null}
    </div>
  );
};

type ReadMoreProps = {
  onClick: MouseEventHandler<HTMLElement>;
};

const ReadMore: FC<ReadMoreProps> = ({ onClick: _onClick }) => {
  return <button onClick={_onClick}>もっと読む</button>;
};
