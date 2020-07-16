import Taro, { Component, Config, ComponentClass } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtTextarea, AtButton, AtToast } from 'taro-ui';
import classnames from 'classnames';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
import TextHeader from '@/components/textHeader';
import './index.less';
import { isNil } from 'lodash';
import { CommonEvent } from '@tarojs/components/types/common';

type PageStateProps = {};

type PageDispatchProps = {
  createComment: (data) => any;
};
type PageOwnProps = {};

type PageState = {
  formData: {
    [key: string]: string;
    comment: string;
    name: string;
    phone: string;
  };
  message: string;
  showMessage: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  () => ({}),
  (dispatch) => ({
    createComment(data) {
      return dispatch({
        type: 'model/createComment',
        payload: data
      });
    }
  })
)
class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      formData: { comment: '', name: '', phone: '' },
      message: '',
      showMessage: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '留言'
  };

  onSubmit(e: CommonEvent) {
    // e.preventDefault();
    const { comment, name, phone } = this.state.formData;
    if (!comment) {
      this.setState({ message: '留言内容不可为空', showMessage: true });
      return;
    }
    if (!name) {
      this.setState({ message: '姓名不可为空', showMessage: true });
      return;
    }
    if (!phone) {
      this.setState({ message: '联系方式不可为空', showMessage: true });
      return;
    }
    this.props.createComment(this.state.formData).then((success) => {
      if (success) {
        this.setState({ message: '留言成功', showMessage: true, formData: { comment: '', name: '', phone: '' } });
      } else {
        this.setState({ message: '留言失败', showMessage: true });
      }
    });
  }
  handleChange(key: string, value: string) {
    let { formData } = this.state;
    formData[key] = value;
    this.setState({ formData: { ...formData } });
  }
  render() {
    const { comment, name, phone } = this.state.formData;
    const { message, showMessage } = this.state;
    return (
      <View className="page_message_container">
        <View className="page_message_header">
          <TextHeader title="欢迎留言" subTitle="Welcome Message" highLightIndexObj={{ first: 1, second: 9 }} />
        </View>
        <AtForm className="page_message_form" onSubmit={this.onSubmit.bind(this)}>
          <View className="page_message_item">
            <Text className="page_message_item_label">留言</Text>
            <AtTextarea
              className={classnames('page_message_item_control', 'page_message_item_control_textarea')}
              placeholder="请输入留言内容"
              maxLength={200}
              value={comment}
              onChange={(value) => {
                this.handleChange('comment', value);
              }}
            />
          </View>
          <View className="page_message_item">
            <Text className="page_message_item_label">姓名</Text>
            <AtInput
              name="name"
              className="page_message_item_control"
              placeholder="请输入姓名"
              maxLength={20}
              border={true}
              type="text"
              value={name}
              onChange={(value: string | number) => {
                this.handleChange('name', String(value));
                return value;
              }}
            />
          </View>
          <View className="page_message_item">
            <Text className="page_message_item_label">联系方式</Text>
            <AtInput
              name="phone"
              className="page_message_item_control"
              placeholder="请输入联系方式"
              maxLength={20}
              type="text"
              value={phone}
              onChange={(value: string | number) => {
                this.handleChange('phone', String(value));
                return value;
              }}
            />
          </View>
          <AtButton type="primary" formType="submit">
            提交
          </AtButton>
        </AtForm>
        <AtToast isOpened={showMessage} text={message} hasMask={true} duration={1000}></AtToast>
        <TabBar current={TabType.Message} />
      </View>
    );
  }
}
export default Index as ComponentClass<IProps, PageState>;
