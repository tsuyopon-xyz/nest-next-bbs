import { useEffect, type ReactElement, type FC } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { refreshToken } from 'src/features/auth/authSlice';
import { Header } from 'src/components/shared/Header';
import { Footer } from 'src/components/shared/Footer';
import styles from './style.module.css';
import { hasTokensInCookie } from 'src/utils/localStorage';

type Props = {
  children: ReactElement;
};

export const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  // ページ起動時、ログイン情報（Cookie）を持っていれば自動ログインする
  useEffect(() => {
    if (hasTokensInCookie()) {
      dispatch(refreshToken());
    }
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
};
