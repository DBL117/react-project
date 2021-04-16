import React, { Component } from 'react';
import { Card, Form, Table, Modal, Button, Input } from 'antd'
import {
  PlusOutlined,
} from '@ant-design/icons';
class role extends Component {
  state = {
    isModalVisible: false
  }
  handleOk = () => {
    this.setState({isModalVisible: false})
  }
  handleCancel = () => {
    this.setState({isModalVisible: false})
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        time: 32,
        op: '西湖区湖底公园1号',
        man: '西湖区湖底公园1号',
      },
    ];
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        width: '13%'
      },
      {
        title: '授权时间',
        dataIndex: 'op',
        key: 'op',
        width: '20%'
      },
      {
        title: '授权人',
        dataIndex: 'man',
        key: 'man',
        width: '10%'

      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '10%',
        render: item => <Button type="link" >设置权限</Button>
      },
    ];
    return (
      <div>
        <Card
          title={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => { this.setState({ isModalVisible: true }) }}>新增角色</Button>
          }
        >
          <Table dataSource={dataSource} columns={columns} bordered />
        </Card>
        <Modal
          visible={this.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item
            label="角色名称">
              <Input></Input>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default role;