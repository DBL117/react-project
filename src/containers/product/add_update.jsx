
import React, { Component } from 'react';
import { Button, Card, Form, Input, message, Select } from 'antd'
import {
  LeftCircleOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { reqCategoryList } from '../../api/index'
import PictrueWall from './pictrue_wall'
const { Option } = Select
class add_update extends Component {
  state = {
    categoryList: []
  }
  componentDidMount() {
    const { categoryList } = this.props
    if (categoryList.length === 0) this.getCategoryList()
    else this.setState({ categoryList })
  }
  onFinish = (value) => {
    console.log(value);
  }
  getCategoryList = async () => {
    const result = await reqCategoryList()
    const { data, status } = result
    if (status === 0) this.setState({ categoryList: data })
    else message.error('服务器出错', 2)
  }
  render() {
    const layout = {
      labelCol: { span: 2, md: 2 },
      wrapperCol: { span: 13, md: 7 },
    };
    return (
      <div>
        <Card
          title={
            <Button icon={<LeftCircleOutlined />} type="link" onClick={() => { this.props.history.go(-1) }}>商品添加</Button>
          }>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={() => { message.error('请完善表单') }}
          >
            <Form.Item
              label="商品名称"
              name="name"
              rules={[{ required: true, message: '此项比输入' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="商品描述"
              name="desc"
              rules={[{ required: true, message: '此项比输入' }]}
              wrapperCol={{ ...layout.wrapperCol }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="商品价格"
              name="price"
              rules={[{ required: true, message: '此项比输入' }]}
            >
              <Input
                type="number"
                addonBefore="￥"
                addonAfter="元" />
            </Form.Item>

            <Form.Item
              label="商品分类"
              name="category"
              rules={[{ required: true, message: '此项比输入' }]}
            >
              <Select>
                {
                  this.state.categoryList.map(item => {
                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="商品图片"
              wrapperCol={{md: 10}}
            // name="img"
            // rules={[{ required: true, message: '此项比输入' }]}
            >
              <PictrueWall></PictrueWall>
            </Form.Item>
            <Form.Item
              label="商品详情"
            // name="detail"
            // rules={[{ required: true, message: '此项比输入' }]}
            >
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ categoryList: state.category })
)(add_update);