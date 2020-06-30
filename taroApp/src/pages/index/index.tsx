import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';
import styles from './index.less';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  render() {
    return (
      <View className={styles.container}>
        <AtTabBar
          tabList={[{ title: '首页' }, { title: '产品' }, { title: '设备' }, { title: '公司' }, { title: '留言' }]}
          onClick={() => {}}
          current={0}
        />
      </View>
    );
  }
}
