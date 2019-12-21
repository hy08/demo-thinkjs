import React from 'react';
import { connect } from "dva";
import { Menu } from 'antd';
import { split } from 'lodash';
import Link from 'umi/link';
import styles from './Header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  handleClick = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'model/saveAppRoute',
      payload: {
        currentRoute: e.key
      }
    });
  };
  render() {
    const { currentRoute } = this.props;
    let selectedKey = null;
    let routeMember = split(currentRoute, '/');
    selectedKey = routeMember[0];
    return (
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={require('./header.png')} alt="昆山三艺强印刷有限公司" />
          </Link>
        </div>
        <Menu selectedKeys={[selectedKey]} mode="horizontal">
          <Menu.Item key="index">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about/1">关于</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/products">产品展示</Link>
          </Menu.Item>
          <Menu.Item key="devices">
            <Link to="/devices">设备展示</Link>
          </Menu.Item>
          <Menu.Item key="linkus">
            <Link to="/linkus">联系我们</Link>
          </Menu.Item>
          <Menu.Item key="comment">
            <Link to="/comment">留言</Link>
          </Menu.Item>
        </Menu>

      </div >
    );
  }
};
function mapStateToProps(state) {
  const { currentRoute } = state.model;
  return { currentRoute };
};
export default connect(mapStateToProps)(Header);