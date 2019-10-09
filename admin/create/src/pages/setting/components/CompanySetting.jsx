import { Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import styles from './BaseView.less';

const FormItem = Form.Item;


@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class CompanySetting extends Component {
  view = undefined;

  componentDidMount() {
    this.setBaseInfo();
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

  getViewDom = ref => {
    this.view = ref;
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        message.success('公司设置已保存');
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
            <FormItem label="公司名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司全称!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                    message: '请输入正确的公司电话',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    message: '请输入正确的公司邮箱',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="公司地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司详细地址',
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

export default Form.create()(CompanySetting);
