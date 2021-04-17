import React, { Component } from 'react';
import { Card, Form, Table, Modal, Button, Input, message, Tree } from 'antd'
import {
  PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { reqAddRole } from '../../api/index'
import { reqRoleList, reqAuthRole } from '../../api/index'
import menuList from '../../config/menu-config'
import { DEFAULT_PAGE_SIZE } from '../../config/index'
class role extends Component {
  state = {
    isModalVisibleAdd: false,
    isModalVisibleAuth: false,
    roleList: [],
    checkedKeys: ['/admin/home'],
    menuList,
    _id: ''
  }
  componentDidMount() {
    this.getRoleList()
  }
  // 新增弹窗的OK回调
  handleAddOk = () => {
    this.formRef.validateFields().then(
      async value => {
        this.setState({ isModalVisibleAdd: false })
        this.formRef.resetFields()
        const result = await reqAddRole(value.name)
        const { status, msg } = result
        if (status === 0) {
          message.success('新增成功', 2)
          this.getRoleList()
        }
        else message.error('新增失败' + msg, 2)
      },
      reason => {
        this.formRef.resetFields()

      }
    )
  }
  // 新增弹窗的取消回调
  handleAddCancel = () => {
    this.formRef.resetFields()
    this.setState({ isModalVisibleAdd: false })
  }
  // 角色管理弹窗的ok回调
  handleAuthOk = async () => {
    this.setState({ isModalVisibleAuth: false })
    const { _id, checkedKeys: menus } = this.state
    const result = await reqAuthRole({ _id, menus, auth_name: this.props.username })
    const { status, msg } = result
    if (status === 0) {
      message.success('授权成功', 2)
      this.setState({ isModalVisibleAuth: false })
      this.getRoleList()
    }
    else message.error(msg, 2)

  }
  // 角色管理弹窗的取消回调
  handleAuthCancel = () => {
    this.setState({ isModalVisibleAuth: false })

  }
  // 点击checkbox的回调 每点一下就更新状态
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }
  handleShowAuth = id => {
    this.setState({ isModalVisibleAuth: true, _id: id })
    // 做每个角色的数据显示 就是设置checkedKeys
    const { roleList } = this.state
    const currentRole = roleList.find(item => item._id === id)
    this.setState({ checkedKeys: currentRole.menus })
  }
  // 请求数据
  getRoleList = async () => {
    const result = await reqRoleList()
    const { status, data } = result
    let data1 = data.map(item => {
      return { ...item, key: item._id }
    })
    if (status === 0) this.setState({ roleList: data1 })
    else message.error('请求数据出错', 2)
  }
  render() {
    const { isModalVisibleAdd, roleList, isModalVisibleAuth, checkedKeys, menuList } = this.state
    const treeData = [
      {
        title: '平台权限',
        key: 'top',
        children: menuList
      }
    ]
    const dataSource = roleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: '13%',
        render: time => time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        width: '20%',
        render: time => time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        width: '10%'

      },
      {
        title: '操作',
        // dataIndex: 'operation',
        key: 'operation',
        width: '10%',
        render: item => <Button type="link" onClick={() => { this.handleShowAuth(item._id) }} >设置权限</Button>
      },
    ];
    return (
      <div>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => { this.setState({ isModalVisibleAdd: true }) }}>新增角色</Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }} />
        </Card>
        <Modal
          visible={isModalVisibleAdd}
          title="新增角色"
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <Form
            onFinish={this.onFinish}
            ref={c => { this.formRef = c }}
          >
            <Form.Item
              label="角色名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入角色名称'
                },
              ]}>
              <Input></Input>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={isModalVisibleAuth}
          title="角色管理"
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
        >
          <Tree
            checkable
            defaultExpandAll
            onCheck={this.onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({ username: state.userInfo.user.username })
)(role)