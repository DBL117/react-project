import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import { createDeleteUserInfoAction } from '../../redux/actions/login'
import Header from './header/header.jsx'
import LeftNav from './left_nav/left_nav'
import Bar from '../bar/bar'
import Pie from '../pie/pie'
import Line from '../line/line'
import Product from '../product/product'
import Detail from '../product/detail'
import AddUpdate from '../product/add_update'
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
               <Route component={ Pie } path="/admin/charts/pie" ></Route>
               <Route component={ Line } path="/admin/charts/line" ></Route>
               <Route component={ Bar } path="/admin/charts/bar" ></Route>
               <Route component={ Product } path="/admin/product_about/product" exact ></Route>
               <Route component={ Detail } path="/admin/product_about/product/detail/:id" ></Route>
               <Route component={ AddUpdate } path="/admin/product_about/product/add_update" exact ></Route>
               {/* ?????????????????????????????????????????????  ?????????id ????????????id ??????id?????????????????????????????? ?????? ???id???????????????????????????????????? */}
               <Route component={ AddUpdate } path="/admin/product_about/product/add_update/:id" ></Route>
               <Redirect to="/admin/home" ></Redirect>
              </Switch>
            </Content>
            <Footer>
              It is recommended to use Google or Firefox browser for better experience
            </Footer>
          </Layout>
        </Layout>
      )
    } else {
      // ???render????????? ?????????redirect
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