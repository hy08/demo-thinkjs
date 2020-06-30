import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';
import styles from './index.less';
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    return <View className={styles.container}>
        <AtTabBar tabList={[{ title: '首页' }, { title: '产品' }, { title: '设备' }, { title: '公司' }, { title: '留言' }]} onClick={() => {}} current={0} />
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
}