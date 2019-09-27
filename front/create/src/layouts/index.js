import { Layout } from 'antd';
import styles from './index.css';
import TopNav from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
function BasicLayout(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.footer}><Footer /></div>
    </div>
  );
}

export default BasicLayout;
