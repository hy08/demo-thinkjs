
import React from 'react';
import styles from './index.css';
import Skitter from '../../components/Skitter/Skitter';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [
        require('./index_banner01.jpg'),
        require('./index_banner02.jpg'),
        require('./index_banner03.jpg')
      ],
    };
  };
  componentDidMount() {
    // 请求数据
  }
  render() {
    const { bannerList } = this.state;
    return (
      <div className={styles.container}>
        <Skitter isIndex={true} imgUrlList={bannerList} />
      </div>
    );
  }
}
export default Index;