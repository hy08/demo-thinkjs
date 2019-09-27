import React from 'react';
import { connect } from "dva";
import { Menu, Icon } from 'antd';
import styles from './Header.less';
import Link from 'umi/link';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'index'
    };
  };
  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={require('./header.png')} alt="昆山三艺强印刷有限公司" />
          </Link>
        </div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="index">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="linkus">
            <Link to="/linkus">关于</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/products">产品展示</Link>
          </Menu.Item>
          <Menu.Item key="devices">
            <Link to="/devices">设备展示</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">联系我们</Link>
          </Menu.Item>
          <Menu.Item key="comment">
            <Link to="/comment">留言</Link>
          </Menu.Item>
        </Menu>

      </div>
    );
  }
};
function mapStateToProps(state) {
  return {};
};
export default connect(mapStateToProps)(Header);