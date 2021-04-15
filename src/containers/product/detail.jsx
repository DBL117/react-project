
import React, { Component } from 'react';
import { Button, Card, List, Image, message } from 'antd'
import {
  LeftCircleOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { reqProductDetail } from '../../api/index'
import './css/detail.less'
const { Item } = List
class detail extends Component {
  state = {
    name: '',
    desc: '',
    price: '',
    status: '',
    imgs: [],
    detail: ''
  }
  componentDidMount() {
    const { productList } = this.props
    if (productList.length === 0) {
      // 刷新就去请求服务器
      this.getProductDetail(this.props.match.params.id)
      return
    }
    const detailObj = productList.find(item => {
      return item._id === this.props.match.params.id
    })
    const { name, desc, price, status, imgs, detail } = detailObj
    this.setState({ name, desc, price, status, imgs, detail })
  }
  getProductDetail = async (id) => {
    const result = await reqProductDetail(id)
    if (result.status === 0) {
      const { name, desc, price, status, imgs, detail } = result.data
      this.setState({ name, desc, price, status, imgs, detail })
    }else {
      message.error('服务器出错', 2)
    }

  }
  render() {
    const { name, desc, price, status, imgs, detail } = this.state
    return (
      <div>
        <Card
          title={
            <Button icon={<LeftCircleOutlined />} type="link" onClick={() => { this.props.history.go(-1) }}>商品详情</Button>
          }
          type="primary">
          <List siz="small">
            <Item>
              <span className="prod-name">商品名称：</span>
              <span>{name}</span>
            </Item>
            <Item>
              <span className="prod-name">商品描述：</span>
              <span>{desc}</span>
            </Item>
            <Item>
              <span className="prod-name">商品价格：</span>
              <span>{price}</span>
            </Item>
            <Item>
              <span className="prod-name">商品状态：</span>
              <span>{status}</span>
            </Item>
            <Item >
              <span className="prod-name">商品图片：</span>
              {
                imgs.map(item => {
                  return <Image key={item} src={'http://localhost:4000/upload/' + item} alt="商品图片" />
                })
              }
            </Item>
            <Item>
              <span className="prod-name">商品详情：</span>
              {/* v-html */}
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </Item>
          </List>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ productList: state.product })
)(detail);