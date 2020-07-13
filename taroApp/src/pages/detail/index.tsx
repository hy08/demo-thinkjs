import Taro, { Component, Config, ComponentClass } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { TabType } from '@/util/enum';
import { split } from 'lodash';
import './index.less';

const NoPicUrl = require('@/assets/img/noPic.png');

type PageStateProps = {};

type PageDispatchProps = {
  getProducts: (data) => any;
  getDevices: (data) => any;
};
type PageOwnProps = {};

type PageState = {
  pageType: TabType;
  obj: any;
  id?: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  () => ({}),
  (dispatch) => ({
    getProducts: (data) => {
      return dispatch({
        type: 'model/getProducts',
        payload: { data }
      });
    },
    getDevices: (data) => {
      return dispatch({
        type: 'model/getDevices',
        payload: {
          data
        }
      });
    }
  })
)
class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      pageType: TabType.Product,
      obj: {},
      id: undefined
    };
  }
  componentWillMount() {
    const { type, id } = this.$router.params;
    if (Number(type) === TabType.Product) {
      this.setState({ pageType: TabType.Product, id: Number(id) });
      this.config.navigationBarTitleText = '产品详情';
    } else {
      this.setState({ pageType: TabType.Device, id: Number(id) });
      this.config.navigationBarTitleText = '设备详情';
    }
  }

  componentDidMount() {
    const { pageType, id } = this.state;
    if (pageType === TabType.Product) {
      this.props
        .getProducts({
          id
        })
        .then((data) => {
          this.setState({ obj: data });
        });
    } else {
      this.props
        .getDevices({
          id
        })
        .then((data) => {
          this.setState({ obj: data });
        });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '详情'
  };

  render() {
    const { obj, pageType } = this.state;
    const imgs = split(obj.pics, ',').map((item) => {
      return item ? item : NoPicUrl;
    });

    return (
      <View className="page_detail_container">
        <Swiper className="page_detail_banner" indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots>
          {imgs.map((item, index) => {
            return (
              <SwiperItem key={index}>
                <Image className="page_detail_banner_img" src={`${window.location.origin + item}`} />
              </SwiperItem>
            );
          })}
        </Swiper>
        <View className="page_detail_name">
          {pageType === TabType.Product ? '产品名' : '设备名'}：{obj.name}
        </View>
        <View className="page_detail_intro">
          <View className="page_detail_intro_header">详情介绍</View>
          <View className="page_detail_intro_content">{obj.intro}</View>
        </View>
      </View>
    );
  }
}
export default Index as ComponentClass<IProps, PageState>;
