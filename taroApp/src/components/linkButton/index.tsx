import Taro from '@tarojs/taro';
import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.less';

type Props = {
  title: string;
  url: string;
};
const LinkBotton: FC<Props> = ({ title, url }) => {
  return (
    <View
      className="com_linkButton"
      onClick={() => {
        Taro.navigateTo({ url });
      }}
    >
      <View className="com_linkButton_btnContent">
        <AtIcon value="link" className="com_linkButton_btnContent_icon" />
        <Text className="com_linkButton_btnContent_btnTitleText">{title}</Text>
      </View>
    </View>
  );
};
export default LinkBotton;
