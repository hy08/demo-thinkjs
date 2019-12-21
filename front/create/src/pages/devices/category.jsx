import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Pagination } from 'antd';
import { isEmpty, isNil, split } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import TextHeader from '../../components/TextHeader';
import PhotoTable from '../../components/PhotoTable';
import styles from './index.less';

@connect(({ model }) => ({}))
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 6,
      total: 0,
      breadcrumbs: [
        { name: '设备展示', href: '/devices' }
      ],
      devices: []
    };
  };

  componentDidMount() {
    this.getDevices();
  }
  getDevices = () => {
    const { dispatch } = this.props;
    const { current, pageSize } = this.state;
    dispatch({
      type: 'model/getDevices',
      payload: {
        data: {
          current, pageSize
        },
        success: (data) => {
          const devices = data.data.map(item => {
            return {
              photo: split(item.pics, ',')[0],
              alt: item.name,
              href: '/devices/' + item.id,
            }
          });
          this.setState({ devices: devices, total: data.count })
        }
      },
    });
  }
  onChange = (pageNumber) => {
    this.setState({ current: pageNumber }, this.getDevices)
  }
  render() {
    const { breadcrumbs, devices, current, total } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={breadcrumbs} />
        </div>
        <div className={styles.content}>
          <TextHeader
            title='设备展示'
            subTitle='EQUIPMENT SHOW​'
            highLightIndexObj={{ first: 1, second: 11 }} />
          <PhotoTable list={devices} />
          <Pagination defaultCurrent={current} total={total} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  categoryCode: PropTypes.string
}
export default Category;