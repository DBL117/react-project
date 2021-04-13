import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import { createDeleteUserInfoAction } from '../../redux/actions/login'
import { reqCategoryList } from '../../api/index'
import Header from './header/header.jsx'
import LeftNav from './left_nav/left_nav'
import Bar from '../bar/bar'
import Pie from '../pie/pie'
import Line from '../line/line'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Category from '../category/category'
import Home from '../../components/home/home'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  handleLogOut = () => {
    this.props.deleteUserInfo(createDeleteUserInfoAction())
  }
  handleGetCategory = async () => {
    const result = await reqCategoryList()
    console.log(result);
  }
  render() {
    const { isLogin } = this.props.userInfo
    if (isLogin) {
      return (
        <Layout className="admin">
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header />
            <Content className="content">
              <Switch>
               <Route component={ Home } path="/admin/home" ></Route>
               <Route component={ Category } path="/admin/product_about/category" ></Route>
               <Route component={ Role } path="/admin/role" ></Route>
               <Route component={ User } path="/admin/user" ></Route>
               <Route component={ Pie } path="/admin/pie" ></Route>
               <Route component={ Line } path="/admin/line" ></Route>
               <Route component={ Bar } path="/admin/bar" ></Route>
               <Route component={ Product } path="/admin/product_about/product" ></Route>
               <Redirect to="/admin/home" ></Redirect>
              </Switch>
            </Content>
            <Footer>
              It is recommended to use Google or Firefox browser for better experience
              <button onClick={this.handleGetCategory} >test</button>
            </Footer>
          </Layout>
        </Layout>
      )
    } else {
      // 在render仲跳转 最好用redirect
      return <Redirect to="/login" />
    }
  }
}

export default connect(
  state => ({ userInfo: state.userInfo }),
  {
    deleteUserInfo: createDeleteUserInfoAction
  }
)(Admin);