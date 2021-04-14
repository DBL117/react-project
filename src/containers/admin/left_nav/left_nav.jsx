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
  createMenu = target => {
    return (
      <Menu.Item key={target.key} icon={target.icon} onClick={() => this.savaTitle(target.title)} >
        <Link to={target.key}>{target.title}</Link>
      </Menu.Item>
    )
  }
  // 保存title到redux
  savaTitle = title => {
    this.props.savaTitle(title)
  }
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
          defaultSelectedKeys={ this.props.location.pathname }
          defaultOpenKeys= {this.props.location.pathname.split('/').splice(2)}
        >
          {
            menuList.map(item => {
              if (!item.children) {
                return this.createMenu(item)
              } else {
                return (
                  <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {
                      item.children.map(item => {
                        return this.createMenu(item)
                      })
                    }
                  </SubMenu>
                )
              }
            })
          }
        </Menu>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  {
    savaTitle: createSaveTitleAction
  }
)(withRouter(left_nav))
 