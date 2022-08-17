import { useState, type FC, type MouseEventHandler } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from 'src/app/hooks';
import { useFindPostsQuery } from 'src/features/posts/api/posts';
import { PostList } from '../PostList';
import paginatorStyles from './paginator.module.css';

const TAKE = 10;
const DEFAULT_PAGE_INDEX = 0;

export const PostContainer: FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth.signin);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const { data, error, isFetching, isLoading } = useFindPostsQuery({
    accessToken: accessToken as string,
    page: pageIndex + 1,
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

      {/* https://github.com/AdeleD/react-paginate#props */}
      <ReactPaginate
        forcePage={pageIndex}
        pageCount={Math.ceil(data.total / TAKE)}
        onPageChange={(selectedItem) => {
          setPageIndex(selectedItem.selected);
        }}
        pageRangeDisplayed={3}
        breakLabel="..."
        nextLabel="次へ >"
        previousLabel="< 前へ"
        containerClassName={paginatorStyles.container}
        pageClassName={paginatorStyles.pageItem}
        pageLinkClassName={paginatorStyles.pageLink}
        activeClassName={paginatorStyles.active}
        activeLinkClassName={paginatorStyles.active}
        previousClassName={paginatorStyles.previous}
        nextClassName={paginatorStyles.next}
      />
    </div>
  );
};
