import Taro, { Component, Config, ComponentClass } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
import './index.less';
import TextHeader from '@/components/textHeader';

type PageStateProps = {
  model: {
    company: any;
  };
};

type PageDispatchProps = {
  getCompany: () => void;
};
type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ model }) => ({ model }),
  (dispatch) => ({
    getCompany: () => {
      dispatch({
        type: 'model/getCompany'
      });
    }
  })
)
class Index extends Component<IProps, PageState> {
  componentWillMount() {}

  componentDidMount() {
    this.props.getCompany();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '公司介绍'
  };

  render() {
    const { company } = this.props.model;
    return (
      <View className="page_company_container">
        <View className="page_company_header">
          <Image className="page_company_img" src={require('./header.png')} />
          <View className="page_company_header_text">公司介绍</View>
        </View>
        <View className="page_company_content">
          <View className="page_company_p">
            <Text className="page_company_p_name">{company && company.name}</Text>
            是一家专业印刷定制不干胶标签的印刷厂，我厂主要生产不干胶标签，条码，二维码 贴纸，货运标签，价格卡，流水号标签，空白标签
            等纸类不干胶产品，同时，我司还提供各种说明书，表单 ，送货单，包装彩盒（卡）等印刷，模切服务并提供最优惠的价格。
          </View>
          <View className="page_company_p">
            公司拥有一批专业的印刷技术人才，专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。
          </View>
          <View className="page_company_p">秉承着顾客至上，科技创新的宗旨，满足客户的需求是我们工作的第一目标，欢迎广大客户惠顾！ </View>
          <View className="page_company_p">经营项目： </View>
          <View className="page_company_ul">
            <View className="page_company_li">1、黑白彩色印刷各种不干胶标签、条形，二维码产品等专用标签。</View>
            <View className="page_company_li">2、代客加工：各类PVC,PET, PI, MAYLAR 材料模切成型及印刷服务。</View>
            <View className="page_company_li">3、自动贴标机 / 卷筒标签印刷 / 产品印刷服务。</View>
          </View>
        </View>
        <TextHeader title="联系我们" subTitle="CONTACT US" highLightIndexObj={{ first: 1, second: 9 }} />
        <View className="page_company_contact">
          <View className="page_company_contact_left">
            <Image className="page_company_contact_bg" src={require('./contactUs.jpg')} />
          </View>
          <View className="page_company_contact_right">
            <View className="page_company_contact_name">{company.name}</View>
            <View className="page_company_contact_content">地址: {company.address}</View>
            <View className="page_company_contact_content">电话: {company.phone}</View>
            <View className="page_company_contact_content">微信: {company.wechat}</View>
            <View className="page_company_contact_content">QQ: {company.qq}</View>
            {company.email ? <View className="page_company_contact_content">邮箱: {company.email}</View> : null}
          </View>
        </View>
        <TabBar current={TabType.Company} />
      </View>
    );
  }
}
export default Index as ComponentClass<IProps, PageState>;
