import { Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { isEmpty } from 'lodash';
import styles from './BaseView.less';
import { clearToken } from '@/utils/authority';

const FormItem = Form.Item;


@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class UserSetting extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        success: () => {
          this.setBaseInfo();
        }
      }
    })
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    if (!isEmpty(currentUser)) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { currentUser, form, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        dispatch({
          type: 'user/putUser',
          payload: {
            data: { id: currentUser.id, ...form.getFieldsValue() },
            success: () => {
              message.success('个人设置已保存,请重新登录');
              clearToken();
              router.push('/user/login');
            }
          }
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="用户昵称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户昵称!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(UserSetting);