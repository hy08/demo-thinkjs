import Nerv from "nervjs";
import { __decorate } from "tslib";
import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import { split } from 'lodash';
import classnames from 'classnames';
import TabBar from "../../components/tabBar/index";
import { TabType } from "../../util/enum";
import TextHeader from "../../components/textHeader/index";
import LinkBotton from "../../components/linkButton/index";
import './index.less';
const NoPicUrl = require('@/assets/img/noPic.png');
const KehuList = [require('./kehu1.png'), require('./kehu2.png'), require('./kehu3.png'), require('./kehu4.png'), require('./kehu5.png'), require('./kehu6.png')];
let Index = class Index extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      devices: []
    };
  }
  componentWillMount() {}
  componentDidMount() {
    // this.props.getCompany();
    // 获取三个类别的第一个商品信息
    this.props.getProducts().then(data => {
      this.setState({ products: data });
    });
    //获取三个设备信息
    this.props.getDevices().then(data => {
      this.setState({ devices: data.data });
    });
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    const { devices, products } = this.state;
    return <View className="page_index_container">
        <Swiper className="page_index_banner" indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots autoplay>
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
        <View className="page_index_part2">
          <TextHeader title="关于三艺强" subTitle="PROFILE" highLightIndexObj={{ first: 1 }} />
          <View className="page_index_intro">
            <View className="page_index_intro_content">
              我司是一家专业印刷定制不干胶标签的印刷厂，我厂主要生产不干胶标签，条码，二维码 贴纸，货运标签，价格卡，流水号标签，空白标签
              等纸类不干胶产品，同时，我司还提供各种说明书，表单 ，送货单，包装彩盒（卡）等印刷，模切服务并提供最优惠的价格。
            </View>
            <View className="page_index_intro_content">
              经营项目： 1、黑白彩色印刷各种不干胶标签、条形，二维码产品等专用标签。 2、代客加工：各类PVC,PET, PI, MAYLAR
              材料模切成型及印刷服务。3、自动贴标机 / 卷筒标签印刷 / 产品印刷服务.
            </View>
            <View className="page_index_intro_content">
              公司拥有一批专业的印刷技术人才，专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。
            </View>
            <View className="page_index_intro_content">
              秉承着顾客至上，科技创新的宗旨，满足客户的需求是我们工作的第一目标，欢迎广大客户惠顾！{' '}
            </View>
          </View>
          <View className="page_index_self">
            <View className="page_index_self_content">
              <View className="page_index_part2_self_countWrap">
                <Text className="page_index_part2_self_countWrap_first">20</Text>
                <Text className="page_index_part2_self_countWrap_second">年</Text>
              </View>
              <View className="page_index_part2_self_label">丰富的行业经验</View>
            </View>
            <View className={classnames(['page_index_self_content', 'page_index_self_content_second'])}>
              <View className="page_index_part2_self_countWrap">
                <Text className="page_index_part2_self_countWrap_first">17</Text>
                <Text className="page_index_part2_self_countWrap_second">名</Text>
              </View>
              <View className="page_index_part2_self_label">伙伴忠诚为您服务</View>
            </View>
            <View className="page_index_self_content">
              <View className="page_index_part2_self_countWrap">
                <Text className="page_index_part2_self_countWrap_first">500</Text>
                <Text className="page_index_part2_self_countWrap_second">平方米</Text>
              </View>
              <View className="page_index_part2_self_label">现代化工业标准厂房</View>
            </View>
          </View>
          <View className="page_index_linkWrap">
            <LinkBotton url="/pages/company/index" title="了解更多" />
          </View>
        </View>
        <View className="page_index_part3">
          <TextHeader title="产品展示" subTitle="PRODUCT" highLightIndexObj={{ first: 1 }} />
          <View className="page_index_intro">
            <View className="page_index_intro_content">拥有专业设计 – 快速打样 – 个性化定制 –智能化制造及物流系统等行业优势，</View>
            <View className="page_index_intro_content">为客户提供专业、快速、低成本、高品质的产品包装加工一站式服务。</View>
          </View>
          <View className="page_index_self">
            {products.map(product => {
            const url = split(product.pics, ',')[0] ? `url(${window.location.origin + split(product.pics, ',')[0]})` : `url(${NoPicUrl})`;
            return <View className="page_index_self_photoWrap" key={product.category_code} onClick={() => {
              Taro.navigateTo({ url: `/pages/detail/index?type=${TabType.Product}&id=${product.id}` });
            }} style={{ backgroundImage: url }}>
                  <View className="page_index_cover">
                    <View className="page_index_cover_title">{product.name}</View>
                    <View className="page_index_cover_cotent">
                      <Text className="page_index_cover_text">{product.intro}</Text>
                    </View>
                  </View>
                </View>;
          })}
          </View>
          <View className="page_index_linkWrap">
            <LinkBotton url={`/pages/money/index?type=${TabType.Product}`} title="了解更多" />
          </View>
        </View>
        <View className="page_index_part4">
          <TextHeader title="设备展示" subTitle="EQUIPMENT" highLightIndexObj={{ first: 1 }} />
          <View className="page_index_intro">
            <View className="page_index_intro_content">
              专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。
            </View>
          </View>
          <View className="page_index_self">
            {devices.map(device => {
            const url = split(device.pics, ',')[0] ? `url(${window.location.origin + split(device.pics, ',')[0]})` : `url(${NoPicUrl})`;
            return <View className="page_index_self_photoWrap" key={device.id} onClick={() => {
              Taro.navigateTo({ url: `/pages/detail/index?type=${TabType.Device}&id=${device.id}` });
            }} style={{
              backgroundImage: url
            }}>
                  <View className="page_index_cover">
                    <View className="page_index_cover_title">{device.name}</View>
                    <View className="page_index_cover_cotent">
                      <Text className="page_index_cover_text">{device.intro}</Text>
                    </View>
                  </View>
                </View>;
          })}
          </View>
          <View className="page_index_linkWrap">
            <LinkBotton url={`/pages/money/index?type=${TabType.Device}`} title="了解更多" />
          </View>
        </View>
        <View className="page_index_part5">
          <TextHeader title="主要客户" subTitle="Main Customers" highLightIndexObj={{ first: 1, second: 6 }} />
          <View className="page_index_part5_kehuList">
            {KehuList.map((kehu, index) => {
            return <Image key={index} className="page_index_part5_kehu" src={kehu} />;
          })}
          </View>
        </View>
        <TabBar current={TabType.Home} />
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
};
Index = __decorate([connect(() => ({}), dispatch => ({
  getCompany() {
    dispatch({
      type: 'model/getCompany'
    });
  },
  getProducts: () => {
    return dispatch({
      type: 'model/getProducts',
      payload: {
        data: {
          index: true
        }
      }
    });
  },
  getDevices() {
    return dispatch({
      type: 'model/getDevices',
      payload: {
        data: {
          current: 0,
          pageSize: 3
        }
      }
    });
  }
}))], Index);
export default Index;