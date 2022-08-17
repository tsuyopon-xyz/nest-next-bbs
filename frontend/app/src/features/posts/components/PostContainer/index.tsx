import { useRouter } from 'next/router';
import { useState, type FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from 'src/app/hooks';
import { useFindPostsQuery } from 'src/features/posts/api/posts';
import { PostList } from '../PostList';
import paginatorStyles from './paginator.module.css';

const TAKE = 10;
const DEFAULT_PAGE_NUMBER = 1;

export const PostContainer: FC = () => {
  const router = useRouter();
  const page = isNaN(parseInt(router.query.page as string))
    ? DEFAULT_PAGE_NUMBER
    : parseInt(router.query.page as string);
  const { accessToken } = useAppSelector((state) => state.auth.signin);

  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const { data, error, isFetching, isLoading } = useFindPostsQuery({
    accessToken: accessToken as string,
    page: page,
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
        forcePage={page - 1}
        pageCount={Math.ceil(data.total / TAKE)}
        onPageChange={(selectedItem) => {
          router.push({
            pathname: '/',
            query: {
              page: selectedItem.selected + 1,
            },
          });
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
