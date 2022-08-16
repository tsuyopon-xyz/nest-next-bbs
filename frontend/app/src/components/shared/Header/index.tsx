import Link from 'next/link';
import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import styles from './style.module.css';
import { signout } from 'src/features/auth/authSlice';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const signinState = useAppSelector((state) => state.auth.signin);

  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={`${styles.navMenu}`}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>
        <ul className={`${styles.navMenu} ${styles.navRightMenu}`}>
          {signinState.accessToken ? (
            <li>
              <Link href="">
                <a
                  onClick={() => {
                    dispatch(signout());
                  }}
                >
                  ログアウト
                </a>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/signup">
                  <a>新規登録</a>
                </Link>
              </li>
              <li>
                <Link href="/signin">
                  <a>ログイン</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
