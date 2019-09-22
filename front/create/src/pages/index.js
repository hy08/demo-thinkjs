import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>首页</li>
        <li>
          <a href="./user">
            去用户页
          </a>
        </li>
      </ul>
    </div>
  );
}
