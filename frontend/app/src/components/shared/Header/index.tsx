import Link from 'next/link';
import type { FC } from 'react';
import styles from './style.module.css';

export const Header: FC = () => {
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
        </ul>
      </nav>
    </header>
  );
};
