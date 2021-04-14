import React, { Component } from 'react';
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { reqCategoryList } from '../../api/index'
import { DEFAULT_PAGE_SIZE } from '../../config/index'
import { addCategory } from '../../api/index'
class category extends Component {
  componentDidMount() {
    this.getCategoryList()
  }
  state = {
    categoryList: [],
    isModalVisible: false,
    operationType: ''
  }
  // 更新分类的回调
  handleUpdataCategory = id => {
    this.setState({
      isModalVisible: true,
      operationType: 'update'
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
    this.formRef.validateFields().then(
      value => {
        if (this.state.operationType === 'add') {
          // 点什么按钮 做什么事
          this.toAdd(value)
        } else {

        }
        this.setState({
          isModalVisible: false,
        })
        this.formRef.resetFields()
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
    const { status, data } = result
    if (status === 0) this.setState({ categoryList: data })
    else message('请求出错', 1)
  }
  // 请求添加分类
  toAdd = async value => {
    const result = await addCategory(value)
    const { status, data } = result
    if( status === 0 ) message.success(`新增${data.name}分类成功`, 2)
    else message.error('新增失败',2)
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
        dataIndex: 'key', // 这里些什么 render的参数就是什么 不写就都给
        key: 'address',
        width: '35%',
        align: 'center',
        render: (id) => { return <Button type="link" onClick={() => { this.handleUpdataCategory(id) }} >修改分类</Button> }
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
            dataSource={dataSource}
            columns={columns} rowKey="_id"
            pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }} />
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
                value="adasdasd"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default category;