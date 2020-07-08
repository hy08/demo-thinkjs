import Taro, { Component, Config } from '@tarojs/taro';

import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
// import {  AtIcon } from 'taro-ui';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
import './index.less';
import TextHeader from '@/components/textHeader';

type PageState = {};

type IProps = {};

interface Index {
  props: IProps;
}

class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '首页'
  };

  render() {
    // const { currentBannerIndex } = this.state;
    return (
      <View className="page_index_container">
        <Swiper className="page_index_banner" indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots>
          <SwiperItem>
            <Image className="page_index_banner_img" src={require('./index_banner01.png')} />
          </SwiperItem>
          <SwiperItem>
            <Image className="page_index_banner_img" src={require('./index_banner02.png')} />
          </SwiperItem>
          <SwiperItem>
            <Image className="page_index_banner_img" src={require('./index_banner03.png')} />
          </SwiperItem>
        </Swiper>
        <View className="page_index_part1">
          <TextHeader title="园区剪影" subTitle="Park Silhouette" highLightIndexObj={{ first: 1, second: 6 }} />
          <View className="page_index_imgs">
            <Image className="page_index_imgs_img" src={require('./unnamed1.png')} />
            <Image className="page_index_imgs_img" src={require('./unnamed2.png')} />
            <Image className="page_index_imgs_img" src={require('./unnamed3.png')} />
            <Image className="page_index_imgs_img" src={require('./unnamed4.png')} />
            <Image className="page_index_imgs_img" src={require('./unnamed5.png')} />
            <Image className="page_index_imgs_img" src={require('./unnamed6.png')} />
          </View>
        </View>
        <TabBar current={TabType.Home} />
      </View>
    );
  }
}
export default Index;
