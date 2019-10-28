import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Table, Button, Modal, Input, Popconfirm, DatePicker } from 'antd';
import uuid from 'uuid';
import commonStyles from '../../styles/common.less';

const { RangePicker } = DatePicker;
const CollectionCreateForm = Form.create({
  name: 'form_in_modal', mapPropsToFields: (props) => ({
    category: Form.createFormField({
      value: props.data.category
    }),
  })
})(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onOk, type, form } = this.props;
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
          title={type + "商品类别"}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form layout="horizontal" {...formItemLayout}>
            <Form.Item label="类别名称">
              {getFieldDecorator('category', {
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
      date: [null, null],
      modalVisible: false,
      add: true,
      category: {
        code: '',
        category: ''
      },
      page: {
        current: 1,
        pageSize: 10
      }
    }
  }
  componentDidMount() {
    this.search();
  }
  search = () => {
    const { dispatch } = this.props;
    const { page, date } = this.state;
    let queryData = { ...page }
    if (date[0] && date[1]) {
      queryData.startTime = date[0].format('YYYY-MM-DD HH:mm:ss');
      queryData.endTime = date[1].format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch({
      type: 'product/readCategoryList',
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
      const { add, category } = this.state;
      if (add) {
        dispatch(
          {
            type: 'product/createCategory',
            payload: {
              data: {
                code: uuid(),
                category: values.category
              },
              success: () => {
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
    const { categoryList, total } = this.props;
    const { date, modalVisible, add, page: { current, pageSize }, category } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '类别',
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
          return <div className={commonStyles.rowOperate}>
            <Button type='primary' size='small' icon='edit' onClick={() => { this.openModal(false, record) }}>修改</Button>
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
            <span className={commonStyles.label}>请选择日期</span><RangePicker value={date} onChange={value => { this.handleChange('date', value) }} />
          </div>
          <div>
            <Button type='primary' icon="search" onClick={this.search}>查询</Button>
            <Button type='default' onClick={this.reset}>重置</Button>
          </div>
        </div>
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
              onChange: this.onShowSizeChange,
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