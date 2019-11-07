import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Button, Modal,
  Input, Popconfirm, DatePicker, Select, message
} from 'antd';
import { isEmpty } from 'lodash';
import MyUpload from '../../components/Upload/index';
import uuid from 'uuid';
import commonStyles from '../../styles/common.less';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CollectionCreateForm = Form.create({
  name: 'form_in_modal', mapPropsToFields: (props) => ({
    name: Form.createFormField({
      value: props.data.name
    }),
    categoryCode: Form.createFormField({
      value: props.data.categoryCode
    }),
    intro: Form.createFormField({
      value: props.data.intro
    }),
    attachmentList: Form.createFormField({
      value: props.data.picList
    })
  })
})(
  // eslint-disable-next-line
  class extends React.Component {
    normFile = e => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    render() {
      const { visible, onCancel, onOk, type, form, data } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 18 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      return (
        <Modal
          visible={visible}
          title={type}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form layout="horizontal" {...formItemLayout}>
            <Form.Item label="商品名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入商品名称!' }],
              })(<Input placeholder="请输入商品名称" />)}
            </Form.Item>
            <Form.Item label="商品类别">
              {getFieldDecorator('categoryCode', {
                rules: [{ required: true, message: '请选择商品类别!' }],
              })(<Select placeholder='请选择商品类别'>
                {data.categoryList.map(category => {
                  return <Option key={category.id} value={category.code}>{category.category}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Form.Item label="商品介绍">
              {getFieldDecorator('intro', {
                rules: [{ required: true, message: '请输入商品介绍!' }],
              })(<TextArea placeholder='请输入商品介绍' />)}
            </Form.Item>
            <Form.Item label="商品图片">
              {getFieldDecorator('attachmentList', {
                valuePropName: 'attachmentList',
                trigger: 'changeAttachmentList',
                getValueFromEvent: this.normFile,
              })(<MyUpload
                type='picture'
                accept='.png,.jpg,jpeg,.gif'
                maxFileSize={1}
                maxFileLength={4}
              />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

const Command = {
  add: 1,
}
@connect(({ product }) => ({
  products: product.products,
  categoryList: product.categoryList,
  total: product.productTotal,
}))
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        date: [null, null],
        categoryCode: null,
        name: '',
        current: 1,
        pageSize: 10
      },
      product: {
        id: '',
        name: '',
        categoryCode: null,
        intro: '',
        modifyTime: null
      },
      modalVisible: false,
      type: null,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/readCategoryList',
      payload: {}
    })
    this.search();
  }
  search = () => {
    const { dispatch } = this.props;
    const { queryData: { date } } = this.state;
    let queryData = { ...queryData }
    if (date[0] && date[1]) {
      queryData.startTime = date[0].format('YYYY-MM-DD HH:mm:ss');
      queryData.endTime = date[1].format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch({
      type: 'product/readProductList',
      payload: queryData
    })
  }
  reset = () => {
    this.setState(({
      date: [null, null]
    }))
  }
  handleChange = (key, value) => {
    this.setState(({
      [key]: value
    }))
  }
  openModal = (type, record) => {
    this.setState(({
      modalVisible: true,
      type: type,
      products: { ...record }
    }));
  }
  closeModal = () => {
    this.setState(({
      modalVisible: false,
      category: { ...{ code: '', category: '' } }
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
    }), () => {
      this.search();
    });
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
      const { dispatch } = this.props;
      const { type, product } = this.state;
      if (type === Command.add) {
        const data = { ...values };
        data.picList = data.attachmentList.map(attachment => attachment.fileId);
        dispatch(
          {
            type: 'product/createProduct',
            payload: {
              data: data,
              success: () => {
                message.success('商品新增成功!');
                this.search();
              }
            }
          }
        )
      } else {
        dispatch(
          {
            type: 'product/updateCategory',
            payload: {
              data: {
                id: category.id,
                category: values.category
              }
            }
          }
        )
      }
      this.closeModal();
    });
  }
  deleteCategory = (record) => {
    const { dispatch } = this.props;
    dispatch(
      {
        type: 'product/deleteCategory',
        payload: {
          data: {
            id: record.id,
          },
          success: () => {
            this.search();
          }
        }
      }
    )
  }
  render() {
    const { products, total, categoryList } = this.props;
    const { queryData: { current, pageSize, date, categoryCode, name }, modalVisible, type, product } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '商品种类',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
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
          return <div className={commonStyles.rowOperate}>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>详情</Button>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>修改</Button>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>上架</Button>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>下架</Button>
            <Popconfirm title="确定删除该记录?" onConfirm={() => this.deleteCategory(record)}>
              <Button type='danger' size='small' icon='delete'>删除</Button>
            </Popconfirm>
          </div>
        }
      },
    ];
    return (
      <div className={commonStyles.main}>
        <div className={commonStyles.condition}>
          <div>
            <span className={commonStyles.label}>更新日期</span>
            <RangePicker value={date} onChange={value => { this.handleChange('date', value) }} />
          </div>
          <div>
            <span className={commonStyles.label}>商品种类</span>
            <Select placeholder='请选择商品类别'
              className={commonStyles.select}
              value={categoryCode}
              onChange={value => { this.handleChange('categoryCode', value) }}>
              {categoryList.map(category => {
                return <Option key={category.id} value={category.code}>{category.category}</Option>
              })}
            </Select>
          </div>
          <div>
            <span className={commonStyles.label}>商品名称</span>
            <Input placeholder='请填写商品名称' value={name} onChange={value => { this.handleChange('name', value) }} />
          </div>
          <div>
            <Button type='primary' icon="search" onClick={this.search}>查询</Button>
            <Button type='default' onClick={this.reset}>重置</Button>
          </div>
        </div>
        <div className={commonStyles.operate}>
          <Button type='primary' icon="plus" onClick={() => { this.openModal(Command.add) }}>新增</Button>
        </div>
        <div className={commonStyles.tableContainer}>
          <Table columns={columns} dataSource={products}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              onChange: this.onShowSizeChange,
              onShowSizeChange: this.onShowSizeChange
            }} />
        </div>
        <CollectionCreateForm
          type={type === 'add' ? '新增商品' : type === 'view' ? '商品详情' : '商品修改'}
          data={{ ...product, ...{ categoryList: categoryList } }}
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