import { Component } from 'react';
import { isEqual } from 'lodash';
import { connect } from "dva";
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Skitter from '../components/Skitter/Skitter';
import TopNav from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './index.css';

const bannerList = [
  require('./index_banner01.jpg'),
  require('./index_banner02.jpg'),
  require('./index_banner03.jpg')
]

@connect(() => ({}))
class BasicLayout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'model/getCompany'
    });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.location.pathname, prevProps.location.pathname)) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <TopNav />
        </div>
        <div className={styles.content}>
          <Skitter isIndex={true} imgUrlList={bannerList} />
          <TransitionGroup>
            <CSSTransition key={this.props.location.pathname} classNames="transition" timeout={300} style={{ position: 'relative' }}>
              <div key={this.props.location.pathname}
                style={{ position: "absolute", width: "100%" }}>
                {this.props.children}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className={styles.footer}><Footer /></div>
      </div>

      // <TransitionGroup>
      //   <CSSTransition key={this.props.location.pathname} classNames="transition" timeout={300}>
      //     <div className={styles.wrap}>
      //       <div className={styles.header}>
      //         <TopNav />
      //       </div>
      //       <div className={styles.content}>
      //         <Skitter isIndex={true} imgUrlList={bannerList} />
      //         {this.props.children}
      //       </div>
      //       <div className={styles.footer}><Footer /></div>
      //     </div>
      //   </CSSTransition>
      // </TransitionGroup>

      // <div className={styles.wrap}>
      //   <div className={styles.header}>
      //     <TopNav />
      //   </div>
      //   <div className={styles.content}>
      //     <Skitter isIndex={true} imgUrlList={bannerList} />
      //     {this.props.children}
      //   </div>
      //   <div className={styles.footer}><Footer /></div>
      // </div>
    );
  }
}
export default withRouter(BasicLayout);