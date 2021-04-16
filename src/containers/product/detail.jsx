
import React, { Component } from 'react';
import { Button, Card, List, Image, message } from 'antd'
import {
  LeftCircleOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { reqProductDetail, reqCategoryList } from '../../api/index'
import './css/detail.less'
import { BASE_URL } from '../../config/index'
const { Item } = List
class detail extends Component {
  state = {
    name: '',
    desc: '',
    price: '',
    status: '',
    imgs: [],
    detail: '',
    categoryId: '',
    categoryName: '',
    isLoading: true
  }
  componentDidMount() {
    const { productList, categoryList } = this.props
    if (productList.length === 0) {
      // 刷新就去请求服务器
      this.getProductDetail(this.props.match.params.id)
    } else {
      const detailObj = productList.find(item => {
        return item._id === this.props.match.params.id
      })
      // setState 是异步的 如果刚存就想用 是拿不到的
      this.categoryId = detailObj.categoryId // 用自己存一下
      this.setState({ ...detailObj })
    }
    if (categoryList.length === 0) {
      // 刷新就去请求服务器
      this.getCategoryList()
    } else {
      let categoryObj = categoryList.find(item => item._id === this.categoryId )
      this.setState({ categoryName: categoryObj.name, isLoading: false })
    }
  }
  getCategoryList = async () => {
    const result = await reqCategoryList()
    const { status, data } = result
    if(status===0){
      let categoryObj = data.find(item => item._id === this.categoryId )
      this.setState({ categoryName: categoryObj.name, isLoading: false })
    }
    else message.error('服务器出错')
  }
  getProductDetail = async (id) => {
    const result = await reqProductDetail(id)
    if (result.status === 0) {
      this.setState({ ...result.data })
      this.categoryId = result.data.categoryId
    }
    else message.error('服务器出错', 2)
  }
  render() {
    const { name, desc, price, status, imgs, detail, categoryName } = this.state
    return (
      <div>
        <Card
          loading={this.state.isLoading}
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
              <span className="prod-name">商品分类：</span>
              <span>{categoryName}</span>
            </Item>
            <Item>
              <span className="prod-name">商品状态：</span>
              <span>{status}</span>
            </Item>
            <Item >
              <span className="prod-name">商品图片：</span>
              {
                imgs.map(item => {
                  return <Image style={{ width: '150px' }} key={item} src={BASE_URL + '/upload/' + item} alt="商品图片" />
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
  state => ({ productList: state.product, categoryList: state.category })
)(detail);