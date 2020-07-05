import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
// import {  AtIcon } from 'taro-ui';
import TabBar from "../../components/tabBar/index";
import { TabType } from "../../util/enum";
import './index.less';
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    return <View className="page_index_container">
        <Text>首页</Text>
        <TabBar current={TabType.Home} />
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
}