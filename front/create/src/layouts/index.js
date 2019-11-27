import Skitter from '../components/Skitter/Skitter';
import TopNav from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './index.css';

const bannerList = [
  require('./index_banner01.jpg'),
  require('./index_banner02.jpg'),
  require('./index_banner03.jpg')
]

function BasicLayout(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div className={styles.content}>
        <Skitter isIndex={true} imgUrlList={bannerList} />
        {props.children}
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  );
}

export default BasicLayout;
