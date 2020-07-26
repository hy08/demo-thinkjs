import Taro from '@tarojs/taro';
import { FC } from 'react';
import { AtTabBar } from 'taro-ui';
import { TabType } from '@/util/enum';

type Props = {
  current?: TabType;
};

const handleNavigateTo = (index: number) => {
  let url = '';
  switch (index) {
    case TabType.Home:
      url = '/pages/index/index';
      break;
    case TabType.Product:
    case TabType.Device:
      url = `/pages/money/index?type=${index}`;
      break;
    case TabType.Company:
      url = '/pages/company/index';
      break;
    case TabType.Message:
      url = '/pages/message/index';
      break;
    default:
      break;
  }
  if (url) {
    Taro.redirectTo({ url });
  }
};
const Tab: FC<Props> = ({ current }) => {
  return (
    <AtTabBar
      fixed
      color="#75878a"
      fontSize={18}
      tabList={[
        { title: '首页', iconPrefixClass: 'icon', iconType: 'shouye' },
        { title: '产品', iconPrefixClass: 'icon', iconType: 'chanpinku  ' },
        { title: '设备', iconPrefixClass: 'icon', iconType: 'shebei' },
        { title: '公司', iconPrefixClass: 'icon', iconType: 'gongsi' },
        { title: '留言', iconPrefixClass: 'icon', iconType: 'liuyan' }
      ]}
      onClick={(index) => {
        handleNavigateTo(index);
      }}
      current={current!}
    />
  );
};

export default Tab;
