import type { ReactElement, FC } from 'react';
import { Header } from 'src/components/shared/Header';
import { Footer } from 'src/components/shared/Footer';
import styles from './style.module.css';

type Props = {
  children: ReactElement;
};

export const Layout: FC<Props> = ({ children }) => (
  <div className={styles.pageContainer}>
    <Header />
    <main className={styles.mainContainer}>{children}</main>
    <Footer />
  </div>
);
