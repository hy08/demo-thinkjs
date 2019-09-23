import styles from '../index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>用户页</li>
        <li>
          <a href="/">
            去首页
          </a>
        </li>
      </ul>
    </div>
  );
}
