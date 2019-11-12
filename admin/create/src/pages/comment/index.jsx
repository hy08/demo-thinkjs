import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Button, Modal,
  Input, Popconfirm, DatePicker, message
} from 'antd';
import { split, truncate } from 'lodash';
import { Command } from '../../utils/emun';
import MyUpload from '../../components/Upload/index';
import commonStyles from '../../styles/common.less';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CollectionCreateForm = Form.create({
  name: 'form_in_modal', mapPropsToFields: (props) => ({
    comment: Form.createFormField({
      value: props.data.comment
    }),
    name: Form.createFormField({
      value: props.data.name
    }),
    phone: Form.createFormField({
      value: props.data.phone
    })
  })
})(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onOk, type, form, data } = this.props;
      const disabled = type === Command.view;
      const title = type === Command.add ? '新增留言' : type === Command.view ? '留言详情' : '留言修改';
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
          width={600}
          visible={visible}
          title={title}
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form layout="horizontal" {...formItemLayout}>
            <Form.Item label="留言内容">
              {getFieldDecorator('comment', {
                rules: [{ required: true, message: '请输入留言内容!' }],
              })(<TextArea placeholder='请输入留言内容' disabled={disabled} />)}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名!' }],
              })(<Input placeholder="请输入姓名" disabled={disabled} />)}
            </Form.Item>
            <Form.Item label="联系电话">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入联系电话!' }],
              })(<Input placeholder="请输入联系电话" disabled={disabled} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

@connect(({ comment }) => ({
  commentList: comment.commentList,
  total: comment.total,
}))
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        date: [null, null],
        current: 1,
        pageSize: 10
      },
      comment: {
        id: '',
        comment: '',
        name: '',
        phone: ''
      },
      modalVisible: false,
      type: null,
    }
  }
  componentDidMount() {
    this.search();
  }
  //重置
  reset = () => {
    this.setState({
      queryData: {
        date: [null, null],
        current: 1,
        pageSize: 10
      }
    })
  }
  //查询条件改变回调
  handleQueryChange = (key, value) => {
    const { queryData } = this.state;
    this.setState({
      queryData: {
        ...queryData, ...{
          [key]: value
        }
      }
    })
  }
  //分页条件改变回调
  onShowSizeChange = (current, pageSize) => {
    const { queryData } = this.state;
    this.setState(({
      queryData: {
        ...queryData, ...{
          current: current,
          pageSize: pageSize
        }
      }
    }), () => {
      this.search();
    });
  }
  openModal = (type, record) => {
    let newRecord = record ? { ...record } : {};
    this.setState(({
      modalVisible: true,
      type: type,
      comment: { ...newRecord }
    }));
  }
  closeModal = () => {
    this.setState(({
      modalVisible: false,
      comment: {
        id: '',
        comment: '',
        name: '',
        phone: ''
      },
      type: null,
    }))
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  //read
  search = () => {
    const { dispatch } = this.props;
    const { queryData: { date }, queryData } = this.state;
    let data = { ...queryData }
    data.startTime = date[0] ? date[0].format('YYYY-MM-DD HH:mm:ss') : '';
    data.endTime = date[1] ? date[1].format('YYYY-MM-DD HH:mm:ss') : '';
    delete data.date;
    dispatch({
      type: 'comment/readCommentList',
      payload: { data }
    })
  }
  //delete
  deleteCategory = (record) => {
    const { dispatch } = this.props;
    dispatch(
      {
        type: 'comment/deleteComment',
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
    const { commentList, total } = this.props;
    const { queryData: { current, pageSize, date }, modalVisible, type, comment } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '留言人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '留言时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return <div className={commonStyles.rowOperate}>
            <Button type='primary' size='small' icon='profile' onClick={() => { this.openModal(Command.view, record) }}>详情</Button>
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
            <span className={commonStyles.label}>留言日期</span>
            <RangePicker value={date} onChange={value => { this.handleQueryChange('date', value) }} />
          </div>
          <div>
            <Button type='primary' icon="search" onClick={this.search}>查询</Button>
            <Button type='default' onClick={this.reset}>重置</Button>
          </div>
        </div>
        <div className={commonStyles.tableContainer}>
          <Table columns={columns} dataSource={commentList}
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
          type={type}
          data={comment}
          wrappedComponentRef={this.saveFormRef}
          visible={modalVisible}
          onCancel={this.closeModal}
          onOk={this.closeModal}
        />
      </div>
    );
  }
}

export default Comment;