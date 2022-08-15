import type { FC } from 'react';
import styles from './style.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://tsuyopon.xyz" target="_blank" rel="noopener noreferrer">
        Powered by Web白熱教室
      </a>
    </footer>
  );
};
