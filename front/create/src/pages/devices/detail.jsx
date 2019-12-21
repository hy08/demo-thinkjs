import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { isEmpty, isNil, split } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import TextHeader from '../../components/TextHeader';
import DetailIntro from '../../components/DetailIntro';
import styles from './index.less';

@connect(({ model }) => ({}))
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      breadcrumbs: [
        { name: '设备展示', href: '/devices' }
      ],
      device: {},
    };
  };

  componentDidMount() {
    this.getDevices();
  }
  getDevices = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'model/getDevices',
      payload: {
        data: { id },
        success: (data) => {
          const { breadcrumbs } = this.state;
          breadcrumbs.push({ name: data.name });
          this.setState({ device: data })
        }
      },
    });
  }
  render() {
    const { breadcrumbs, device } = this.state;
    const pics = !isEmpty(device) ? split(device.pics, ',') : [];
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={breadcrumbs} />
        </div>
        <div className={styles.content}>
          <TextHeader
            title='详情展示'
            subTitle='DETAIL SHOW'
            highLightIndexObj={{ first: 1, second: 8 }} />
          <DetailIntro
            isProduct={false}
            pics={pics}
            title={device.name}
            intro={device.intro} />
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  categoryCode: PropTypes.string
}
export default Detail;