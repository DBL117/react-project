import React, { Component } from 'react';
import { Card, Button, message, Table, Select, Input, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import { reqProductList, reqUpdateProductStatus, reqSearchProductList } from '../../api/index'
import { DEFAULT_PAGE_SIZE, DEFAULT_COLOR } from '../../config/index'
import { createSaveProductListAction } from '../../redux/actions/product'
const { Option } = Select
class product extends Component {
  state = {
    productList: [],
    total: 0,
    searchKeyWord: '',
    isTableLoading: false,
    searchType: 'productName'
  }
  componentDidMount() {
    this.getProductList()
  }
  // 搜索按钮回调
  handleSearch = () => {
    this.search = true
    this.getProductList()
  }
  // 获取商品列表
  getProductList = async (currentNum = 1) => {
    let result
    if (this.search) {
      const { searchType, searchKeyWord } = this.state
      result = await reqSearchProductList(currentNum, DEFAULT_PAGE_SIZE, searchType, searchKeyWord)
    } else {
      result = await reqProductList(currentNum, DEFAULT_PAGE_SIZE)
    }
    // 将获取到的五条数据 保存到redux中 避免到detail页面继续请求服务器 节约性能
    const { total, list } = result.data
    this.props.saveProducrList(list)
    this.setState({ productList: list, total, isTableLoading: false })
  }
  // 更新product的状态
  handleUpdateProductStatus = async item => {
    let { productList } = this.state
    let { _id, status } = item
    if (status === 1) status = 2
    else status = 1
    const result = await reqUpdateProductStatus(_id, status)
    if (result.status === 0) {
      message.success('更新状态成功', 2)
      productList = productList.map(item => {
        if (item._id === _id) item.status = status
        return item
      })
      this.setState({ productList })
    } else {
      message.error('更新状态失败', 2)
    }
  }
  render() {
    const dataSource = this.state.productList
    const columns = [
      {
        title: '商品名称',
        width: '20%',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        align: 'center',
        render: price => '￥' + price
      },
      {
        title: '更新商品状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '10%',
        render: item => {
          return (
            <div>
              <Button
                type={item.status === 1 ? 'danger' : 'primary'}
                onClick={() => { this.handleUpdateProductStatus(item) }}>
                {item.status === 1 ? '下架' : '上架'}
              </Button>
              <Tag
                color={item.status === 1 ? DEFAULT_COLOR : '#cd201f'}>
                {item.status === 1 ? '在售' : '已停售'}
              </Tag>
            </div>
          )
        }
      },
      {
        title: '商品操作',
        // dataIndex: 'operation',
        key: 'operation',
        width: '15%',
        align: 'center',
        render: item => {
          return (
            <div>
              <Button type="link" onClick={() => { this.props.history.push('/admin/product_about/product/detail/' + item._id) }} >详情</Button>
              <Button type="link" onClick={() => { this.props.history.push('/admin/product_about/product/add_update/' + item._id) }} >修改</Button>
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <Card
          extra={<Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={ () => { this.props.history.push('/admin/product_about/product/add_update') }} >新增商品</Button>}
          type="primary"
          title={
            <div>
              <Select
                defaultValue="productName"
                style={{ width: 120 }}
                onChange={value => { this.setState({ searchType: value }) }}>
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input
                placeholder="请输入关键字"
                style={{ margin: '0px 10px', width: '20%' }}
                allowClear
                onChange={currentNode => { this.setState({ searchKeyWord: currentNode.currentTarget.value }) }}>
              </Input>
              <Button
                icon={<SearchOutlined />}
                type="primary"
                onClick={this.handleSearch} >搜索</Button>
            </div>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey="_id"
            loading={this.isTableLoading}
            pagination={{
              defaultPageSize: DEFAULT_PAGE_SIZE,
              showQuickJumper: true,
              total: this.state.total,
              onChange: this.getProductList
            }} />
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  {
    saveProducrList: createSaveProductListAction
  }
)(product);