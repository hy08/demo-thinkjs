import React from 'react';
import { connect } from "dva";
import { Button } from 'antd';
import moment from 'moment';
import styles from './Footer.less';

class Footer extends React.Component {
  static defaultProps = {

  }
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.footerNav}></div>
          <div className={styles.products}></div>
          <div className={styles.about}></div>
          <div className={styles.linkus}></div>
        </div>
        <div className={styles.copyright}>
          版权所有：杭州星阁网络科技有限公司 © 2018 星阁云　　苏ICP备xxxxxxxxx号-1
        </div>
      </div>
    );
  };
};
Footer.propTypes = {
}
function mapStateToProps(state) {
  return {};
};
export default connect(mapStateToProps)(Footer);