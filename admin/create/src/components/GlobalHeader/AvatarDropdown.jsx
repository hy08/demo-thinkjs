import { Avatar, Icon, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }

    router.push('/user/login');
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      }
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {currentUser.avatar ? <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> : <Avatar className={styles.avatar} size="small" icon="user" />}
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
