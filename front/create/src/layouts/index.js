import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './index.css';
function BasicLayout(props) {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.normal}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default BasicLayout;
