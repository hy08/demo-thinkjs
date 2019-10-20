import { Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import md5 from 'js-md5';
import styles from './BaseView.less';
import { clearToken } from '@/utils/authority';

const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class PasswordSetting extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent'
    })
  }
  handlerSubmit = event => {
    const { currentUser, form, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        dispatch({
          type: 'user/putUser',
          payload: {
            data: { id: currentUser.id, password: md5(form.getFieldValue('newpassword')) },
            success: () => {
              message.success('密码已修改,请重新登录');
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
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const validatorPassword = (rule, value, callback) => {
      const password = getFieldValue('newpassword');
      if (password !== value) {
        callback('两次密码不一致!');
      }
      callback();
    };

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="新密码">
              {getFieldDecorator('newpassword', {
                rules: [
                  {
                    required: true,
                    min: 6,
                    message: '密码最少六位!',
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
            <FormItem label="再次输入新密码">
              {getFieldDecorator('newpasswordAgain', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入新密码',
                  },
                  {
                    validator: validatorPassword,
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(PasswordSetting);