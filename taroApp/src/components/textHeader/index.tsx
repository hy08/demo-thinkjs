import Taro from '@tarojs/taro';
import { FC } from 'react';
import classnames from 'classnames';
import './index.less';
import { View, Text } from '@tarojs/components';

type Props = {
  title: string;
  subTitle: string;
  highLightIndexObj: { first: number; second: number };
};
const TextHeader: FC<Props> = ({ title, subTitle, highLightIndexObj }) => {
  const { first, second } = highLightIndexObj;
  return (
    <View className="com_textHeader_header">
      <View>{title}</View>
      <View>
        {subTitle.split('').map((letter, index) => {
          return (
            <Text key={index} className={classnames({ com_textHeader_blueColor: index + 1 === first || index + 1 === second })}>
              {letter}
            </Text>
          );
        })}
      </View>
    </View>
  );
};
export default TextHeader;
