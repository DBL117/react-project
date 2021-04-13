import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Menu
} from 'antd'
import {
  HomeOutlined,
  WalletOutlined,
  ToolOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import logo from '../../../static/imgs/logo.png'
import './left_nav.less'
const { SubMenu } = Menu
class left_nav extends Component {
  render() {
    return (
      <div className="container_nav">
        <div className="div_nav">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <Menu
          mode="inline"
          theme="light"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin/home">首页</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<WalletOutlined />} title="商品">
            <Menu.Item key="9"><UnorderedListOutlined />
              <Link to="/admin/product_about/category">分类管理</Link>
            </Menu.Item>
            <Menu.Item key="10"><ToolOutlined />
              <Link to="/admin/product_about/product">商品管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default left_nav;