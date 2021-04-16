
import React, { Component } from 'react';
import { Button, Card, Form, Input, message, Select } from 'antd'
import {
  LeftCircleOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { reqCategoryList, reqProductAdd, reqProductDetail } from '../../api/index'
import PictrueWall from './pictrue_wall'
import RichTextEditor from './rich_text_editor'

const { Option } = Select
class add_update extends Component {
  state = {
    categoryList: [],
    type: 'add', // 决定到底是作为新增 还是修改显示的标识
    name: '',
    desc: '',
    imgs: [],
    price: '',
    categoryId: '',
    detail: '',
    _id: ''
  }
  componentDidMount() {
    const { categoryList, productList } = this.props
    const { id } = this.props.match.params
    if (id) {
      // 存在id就是修改页面
      this.setState({ type: 'update' }) 
      if (productList.length === 0) this.getProductList(id) // 如果redux中没有数据就发请求
      else {
        const productObj = productList.find(item => item._id === id)
        this.setState({ ...productObj }, () => this.form.setFieldsValue({ ...this.state }))
        this.pictureWall.setImgList(productObj.imgs)
        this.richTextEditor.setRichText(productObj.detail)
      }
    }

    if (categoryList.length === 0) this.getCategoryList()
    else this.setState({ categoryList })
  }
  // 请求获取product列表
  getProductList = async (id) => {
    const result = await reqProductDetail(id)
    const { status, data } = result
    if (status === 0) {
      this.setState({ ...data }, () => this.form.setFieldsValue({ ...this.state }))
      this.pictureWall.setImgList(data.imgs)
      this.richTextEditor.setRichText(data.detail)
    }
    else message.error('请求product出错', 2)
  }
  // 校验成功的回调(有新加 或修改)
  onFinish = async (value) => {
    // 调用子组件的方法
    const imgs = this.pictureWall.getImgNameList()
    const detail = this.richTextEditor.getRichText()
    if (imgs.length === 0 || detail === '<p></p>\n') message.error('请完善表单', 2)
    else {
      let result = null
      let typeMsg = null
      if (this.state.type === "add") {
        // 新增请求
        typeMsg = '新增'
        result = await reqProductAdd({ ...value, imgs, detail })
      } else {
        // 更新请求
        typeMsg = '更新'
        console.log('update shop');
        result = await reqProductAdd({ ...value, imgs, detail })
      }
      const { status, msg } = result
      if (status === 0) {
        message.success(typeMsg + '成功', 2)
        this.props.history.push('/admin/product_about/product')
      } else if (status === 1) {
        message.warning(msg, 2)
      }
      else message.error('服务器出错', 2)
    }
  }
  // 获取category列表
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
            <Button icon={<LeftCircleOutlined />} type="link" onClick={() => { this.props.history.go(-1) }}>商品{this.state.type === 'add' ? '添加' : '修改'} </Button>
          }>
          <Form
            {...layout}
            name="basic"

            ref={e => this.form = e}
            // initialValues={{ remember: false }}
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
              name="categoryId"
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
              wrapperCol={{ md: 10 }}
            // name="img"
            // rules={[{ required: true, message: '此项比输入' }]}
            >
              <PictrueWall ref={e => this.pictureWall = e} ></PictrueWall>
            </Form.Item>
            <Form.Item
              label="商品详情"
              wrapperCol={{ md: 14 }}
            // name="detail"
            // rules={[{ required: true, message: '此项比输入' }]}
            >
              <RichTextEditor ref={e => this.richTextEditor = e} />
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
  state => ({ categoryList: state.category, productList: state.product })
)(add_update);