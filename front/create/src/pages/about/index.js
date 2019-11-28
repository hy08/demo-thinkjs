import React from 'react';
import { Icon } from 'antd';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import classnames from 'classnames';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  };
  componentDidMount() {
    // 请求数据
    console.log(this.props)
  }
  render() {
    const { links } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <MyBreadcrumb links={links} />
        </div>
        <div className={styles.content}></div>
      </div>
    );
  }
}
export default Index;