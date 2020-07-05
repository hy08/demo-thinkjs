import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
// import { AtTabBar, AtIcon } from 'taro-ui';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
// import './index.less';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '公司介绍'
  };

  render() {
    return (
      <View className="page_index_container">
        <Text>公司</Text>
        <TabBar current={TabType.Company} />
      </View>
    );
  }
}
