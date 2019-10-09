import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { connect } from 'dva';
import CompanySetting from './components/CompanySetting';
import UserSetting from './components/UserSetting';
import PasswordSetting from './components/PasswordSetting';
import { isEmpty } from 'lodash';
import styles from './style.less';

const { Item } = Menu;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Setting extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      company: '公司设置',
      user: '个人设置',
      password: '修改密码'
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'company',
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = key => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'company':
        return <CompanySetting />;

      case 'user':
        return <UserSetting />;

      case 'password':
        return <PasswordSetting />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;

    if (isEmpty(currentUser)) {
      return '';
    }

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Setting;
