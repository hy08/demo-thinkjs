import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, Text } from '@tarojs/components';
// import { AtTabBar, AtIcon } from 'taro-ui';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
// import './index.less';

type IProps = {};
type IState = {
  pageType: TabType;
};
interface Index {
  props: IProps;
}
class Index extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      pageType: TabType.Product
    };
  }

  componentWillMount() {
    console.log(this.$router.params);
    const { type } = this.$router.params;
    if (Number(type) === TabType.Product) {
      this.setState({ pageType: TabType.Product });
    } else {
      this.setState({ pageType: TabType.Device });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: this.state.pageType === TabType.Product ? '产品' : '设备'
  };

  render() {
    const { pageType } = this.state;
    return (
      <View className="page_index_container">
        <Text>{pageType === TabType.Product ? '产品' : '设备'}</Text>
        <TabBar current={pageType} />
      </View>
    );
  }
}
export default Index as ComponentClass<IProps, IState>;
