import React, { Component } from 'react';
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { reqCategoryList } from '../../api/index'
import { DEFAULT_PAGE_SIZE } from '../../config/index'
import { reqAddCategory, reqUpdateCategory } from '../../api/index'
class category extends Component {
  componentDidMount() {
    this.getCategoryList()
  }
  state = {
    categoryList: [],
    isModalVisible: false,
    operationType: '',
    isTableLoading: true,
    modalCurrentId: '' // 更新分类时 保存id的
  }
  // 更新分类的回调
  handleUpdataCategory = item => {
    const { _id } = item
    this.setState({
      isModalVisible: true,
      operationType: 'update',
      modalCurrentId: _id
    })
  }
  // 新增分类按钮的回调
  handleAddCategory = () => {
    this.setState({
      isModalVisible: true,
      operationType: 'add'
    })
  }
  // modal的ok回调
  handleOk = () => {
    // 触发校验机制
    this.formRef.validateFields().then(
      value => {
        if (this.state.operationType === 'add') {
          // 点什么按钮 做什么事
          this.toAdd(value)
        } else {
          this.toUpdate({
            categoryId: this.state.modalCurrentId,
            categoryName: value.categoryName
          })
        }
      },
      reason => {
        message.warning('请输入分类名', 2)
      }
    )


  }
  // modal的cancel回调
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    })
    this.formRef.resetFields()
  }
  // 请求后端获取分类的回调
  getCategoryList = async () => {
    const result = await reqCategoryList()
    // 改变表格loading
    this.setState({ isTableLoading: false })
    const { status, data } = result
    if (status === 0) this.setState({ categoryList: data.reverse() })
    else message('请求出错', 1)
  }
  // 请求添加分类
  toAdd = async valueObj => {
    const result = await reqAddCategory(valueObj)
    const { status, data, msg } = result
    if (status === 0) {
      message.success(`新增${data.name}分类成功`, 2)
      // state中是object或arr 不要直接解构 会出问题
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      // 更新状态 关闭modal
      this.setState({ categoryList, isModalVisible: false })
      // 触发form的重置
      this.formRef.resetFields()
    }
    else {
      message.error(msg, 2)
    }
  }
  toUpdate = async valueObj => {
    const result = await reqUpdateCategory(valueObj)
    const { status, msg } = result
    if (status === 0) {
      message.success('修改分类分类成功', 2)
      this.getCategoryList()
      // 更新状态 关闭modal
      this.setState({ isModalVisible: false })
      // 触发form的重置
      this.formRef.resetFields()
    }
    else {
      message.error(msg, 2)
    }

  }
  render() {
    const dataSource = this.state.categoryList
    const { isModalVisible, operationType } = this.state
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        width: '65%'
      },
      {
        title: '操作',
        //dataIndex: 'key', // 这里些什么 render的参数就是什么 不写就都给
        key: 'operation',
        width: '35%',
        align: 'center',
        render: (item) => { return <Button type="link" onClick={() => { this.handleUpdataCategory(item) }} >修改分类</Button> }
      },
    ];
    return (
      <div>
        <Card
          title='分类管理'
          extra={<Button icon={<PlusOutlined />}
          type="primary"
          onClick={this.handleAddCategory}>增加</Button>} >
          <Table
            bordered
            loading={this.isTableLoading}
            dataSource={dataSource}
            columns={columns}
            rowKey="_id"
            pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE, showQuickJumper: true }} />
        </Card>
        <Modal title={operationType === 'add' ? '新增分类' : '更新分类'}
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form
            ref={c => { this.formRef = c }}
            onFinish={this.handleOk}
          >
            <Form.Item
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: '请输入分类名'
                },
              ]}
            >
              <Input
                placeholder="请输入分类名"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default category;