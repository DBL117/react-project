import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../../static/imgs/logo.png'
import { createSaveTitleAction } from '../../../redux/actions/title'
import './left_nav.less'
import menuList from '../../../config/menu-config'
const { SubMenu } = Menu
class left_nav extends Component {
  hasAuth = (item) => {
    //获取当前用户可以看到的菜单的数组
    const {userRoleMenus,username} = this.props
    if(username === 'admin') return true
    else if(!item.children){
      return userRoleMenus.indexOf(item.key) !== -1
    }else if (item.children){
      return item.children.some((item3)=>{return userRoleMenus.indexOf(item3.key) !== -1})
    }
  }
  createMenu = target => {
    return target.map(item => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => this.savaTitle(item.title)} >
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        } else {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {
                this.createMenu(item.children)
              }
            </SubMenu>
          )
        }
      }else{
        return ''
      }
    })
  }
  // 保存title到redux
  savaTitle = title => {
    this.props.savaTitle(title)
  }
  render() {
    const { pathname } = this.props.location
    return (
      <div className="container_nav">
        <div className="div_nav">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <Menu
          mode="inline"
          theme="light"
          // 如路由中带有/product_about/product 就全部匹配到 /admin/product_about/product 没有的话再去正常匹配
          defaultSelectedKeys={pathname.indexOf('/product_about/product') !== -1 ? '/admin/product_about/product' : pathname}
          // defaultSelectedKeys={ this.props.location.pathname }
          defaultOpenKeys={pathname.split('/').splice(2)}
        >
          {
            this.createMenu(menuList)
          }
        </Menu>
      </div>
    );
  }
}
export default connect(
  state => ({
    userRoleMenus: state.userInfo.user.role.menus,
    username: state.userInfo.user.username,
  }),
  {
    savaTitle: createSaveTitleAction
  }
)(withRouter(left_nav))
