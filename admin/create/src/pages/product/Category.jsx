import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Table, Button, Modal, Input, Popconfirm } from 'antd';
import { isEmpty } from 'lodash';
import uuid from 'uuid';
import commonStyles from '../../styles/common.less';

const CollectionCreateForm = Form.create({
  name: 'form_in_modal', mapPropsToFields: (props) => ({
    name: props.data.name
  })
})(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onOk, type, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={type + "商品种类"}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form layout="vertical">
            <Form.Item label="种类名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入种类名称!' }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

@connect(({ product }) => ({
  categoryList: product.categoryList,
  total: product.total,
}))
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      add: true,
      category: {
        code: '',
        name: ''
      },
      page: {
        current: 1,
        pageSize: 2
      }
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.state;
    dispatch({
      type: 'product/readCategoryList',
      payload: page
    })
  }
  openModal = (add, record) => {
    this.setState(({
      modalVisible: true,
      add: add,
      category: { ...record }
    }));
  }
  closeModal = () => {
    this.setState(({
      modalVisible: false,
      category: { ...{ code: '', name: '' } }
    }))
  }
  onShowSizeChange = (current, pageSize) => {
    this.setState(({
      page: {
        ...{
          current: current,
          pageSize: pageSize
        }
      }
    }))
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  handleOk = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      // form.resetFields();
      const { dispatch } = this.props;
      dispatch(
        { type: 'product/addCategory' }
      )
      this.closeModal();
    });
  }
  deleteCategory = (record) => {
  }
  render() {
    const { categoryList, total } = this.props;
    const { modalVisible, add, page: { current, pageSize }, category } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '名称',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '更新时间',
        dataIndex: 'modify_time',
        key: 'modify_time',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return <Fragment>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>修改</Button>
            <Popconfirm title="确定删除该记录?" onConfirm={() => this.deleteCategory(record)}>
              <Button type='danger' size='small' icon='delete'>删除</Button>
            </Popconfirm>
          </Fragment>
        }
      },
    ];
    return (
      <div className={commonStyles.main}>
        <div className={commonStyles.operate}>
          <Button type='primary' icon="plus" onClick={() => { this.openModal(true) }}>新增</Button>
        </div>
        <div className={commonStyles.tableContainer}>
          <Table columns={columns} dataSource={categoryList}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange
            }} />
        </div>
        <CollectionCreateForm
          type={add ? '新增' : '修改'}
          data={category}
          wrappedComponentRef={this.saveFormRef}
          visible={modalVisible}
          onCancel={this.closeModal}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}

export default Category;