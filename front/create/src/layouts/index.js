import { Component } from 'react';
import { isEqual, split } from 'lodash';
import { connect } from "dva";
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Skitter from '../components/Skitter/Skitter';
import TopNav from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './index.less';

const bannerList = [
  require('./index_banner01.png'),
  require('./index_banner02.png'),
  require('./index_banner03.png')
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
    let prevParams = split(prevProps.location.pathname, '/');
    let nextParams = split(this.props.location.pathname, '/');
    if (prevParams.length > 2 && nextParams.length > 2) {
      return;
    } else if (!isEqual(this.props.location.pathname, prevProps.location.pathname)) {
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
            <CSSTransition key={this.props.location.pathname} classNames="transition" timeout={200} style={{ position: 'relative' }}>
              <div key={this.props.location.pathname}
                style={{ position: "absolute", width: "100%" }}>
                {this.props.children}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(BasicLayout);