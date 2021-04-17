import React, { Component } from 'react';
import { Card, Form, Table, Modal, Button, Input, message, Select } from 'antd'
import {
  PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs'
import { reqUserList, reqUserAdd } from '../../api/index'
import { DEFAULT_PAGE_SIZE } from '../../config/index'
const { Option } = Select
class user extends Component {
  state = {
    isModalVisibleAdd: false,
    userList: [],
    roleList: []
  }
  componentDidMount() {
    this.getUserList()
  }
  handleOk = () => {
    this.formRef.validateFields()
      .then(
        value => {
          this.addUser(value)
          this.formRef.resetFields()
          this.setState({ isModalVisibleAdd: false })
        }
      )
  }
  handleCancel = () => {
    this.setState({ isModalVisibleAdd: false })
    this.formRef.resetFields()
  }
  addUser = async userObj => {
    const result = await reqUserAdd(userObj)
    const { data, status, msg } = result
    if (status !== 0) message.error(msg, 2)
    else {
      message.success('新增用户成功', 2)
      const userList = [...this.state.userList]
      userList.unshift(data)
      this.setState({ userList })
    }
  }
  getUserList = async () => {
    const result = await reqUserList()
    const { data, msg, status } = result
    if (status !== 0) message.error(msg, 2)
    else {
      let result = data.users.map(item => ({...item, key: item._id }))
      this.setState({
        userList: result,
        roleList: data.roles
      })
    }
  }

  render() {
    const { isModalVisibleAdd } = this.state
    const dataSource = this.state.userList.reverse()
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: '10%'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '10%',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: '10%',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: '10%',
        render: time => time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        width: '10%',
        render: id => {
          let roleObj = this.state.roleList.find(item => item._id === id)
          return roleObj.name
        }
      },
      {
        title: '操作',
        // dataIndex: 'operation',
        key: 'operation',
        width: '10%',
        render: item => {
          return <div>
            <Button type="link" onClick={() => { this.handleShowAuth(item._id) }} >
              修改
            </Button>
            <Button type="link" onClick={() => { this.handleShowAuth(item._id) }} >
              删除
            </Button>
          </div>
        }
      },
    ];
    return (
      <div>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => { this.setState({ isModalVisibleAdd: true }) }}>新增用户</Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }}
            bordered />
        </Card>
        <Modal
          visible={isModalVisibleAdd}
          title="新增用户"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            onFinish={this.onFinish}
            ref={c => { this.formRef = c }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入角色名称'
                },
              ]}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                },
              ]}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱'
                },
              ]}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="电话"
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入电话'
                },
              ]}>
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="角色"
              name="role_id"
              rules={[
                {
                  required: true,
                  message: '请选择角色名称'
                },
              ]}>
              <Select>
                {
                  this.state.roleList.map(item => <Option key={item._id} value={item._id} >{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default user;