import React from 'react';
import { connect } from 'dva';
import { Icon, Form, Input, Button, message } from 'antd';
import { isEqual } from 'lodash';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import MyMenu from '../../components/MyMenu';
import TextHeader from '../../components/TextHeader';
import styles from './index.less';

const { TextArea } = Input;
const ContentType = {
  linkus: '1',
  comment: '2',
  map: '3'
}

@connect(({ model }) => ({
  company: model.company
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: props.match.params.type,
      links: [],
      menus: [
        { name: '在线留言', href: '/linkus/2', current: false, type: ContentType.comment },
        { name: '联系方式', href: '/linkus/1', current: false, type: ContentType.linkus }
      ],
    };
  };
  componentDidMount() {
    this.setMyBreadcrumbAndMenus();
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params)) {
      this.setState({ contentType: this.props.match.params.type }, () => {
        this.setMyBreadcrumbAndMenus();
      });
    }
  }
  setMyBreadcrumbAndMenus = () => {
    const { contentType, menus } = this.state;
    const links = [];
    switch (contentType) {
      case ContentType.comment:
        links.push({ name: '在线留言', href: '/linkus/2' });
        break;
      default:
        links.push({ name: '联系方式', href: '/linkus/1' });
        break;
    }
    let menu = menus.find(menu => menu.type === contentType);
    if (menu) {
      menu.current = true;
    }
    this.setState({ links, menus: [...menus] });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'model/createComment',
          payload: values,
          success: () => {
            form.resetFields();
            message.success('留言提交成功');
          }
        });
      }
    });
  };
  //渲染在线留言
  renderComment = () => {
    const { company } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.comment}>
        <div className={styles.commentLeft}>
          <p className={styles.companyName}>{company.name}</p>
          {
            company.email && <div>
              <Icon type="mail" />
              <p>电子邮箱<br /><a href={'mailto:' + company.email}>{company.email}</a></p>
            </div>
          }
          <div>
            <Icon type="phone" />
            <p>联系电话<br />{company.phone}</p>
          </div>
          <div>
            <Icon type="environment" />
            <p>联系地址<br />{company.address}</p>
          </div>
        </div>
        <div className={styles.commentRight}>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} onSubmit={this.handleSubmit}>
            <Form.Item label="留言内容">
              {getFieldDecorator('comment', {
                rules: [
                  { required: true, message: '请输入留言内容!' },
                  { max: 300, message: '留言内容不能超过300个字符!' },
                  { whitespace: true, message: '请输入留言内容!' },
                ],
              })(<TextArea autosize={{ minRows: 5, maxRows: 10 }} />)}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入姓名!' },
                  { whitespace: true, message: '请输入姓名!' },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入联系电话!' },
                  { pattern: /^\d+$/, message: '联系电话只能是数字!' },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit" block>提交</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  //渲染联系方式
  renderLinkUs = () => {
    const { company } = this.props;
    return (
      <div className={styles.linkus}>
        <img src={require('./contactUs.jpg')} alt="联系我们" />
        <div className={styles.linkusRight}>
          <p className={styles.companyName}>{company.name}</p>
          <p>地址: {company.address}</p>
          <p>电话: {company.phone}</p>
          <p>邮箱: {company.email ? <a href={'mailto:' + company.email}>{company.email}</a> : ''}</p>
        </div>
      </div>
    )
  }
  render() {
    const { links, menus, contentType } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerNav}>
          <MyBreadcrumb links={links} />
          <MyMenu menus={menus} />
        </div>
        <div className={styles.content}>
          <TextHeader
            title='联系我们'
            subTitle='CONTACT US'
            highLightIndexObj={{ first: 1, second: 9 }} />
          {contentType === ContentType.comment ? this.renderComment() : this.renderLinkUs()}
        </div>
      </div>
    );
  }
}
export default Form.create({ name: 'comment' })(Index);