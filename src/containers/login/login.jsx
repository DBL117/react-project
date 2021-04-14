import React, { Component } from 'react';
import { Form, Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import {  Redirect } from 'react-router-dom'
import { reqLogin } from '../../api/index'
import { createSaveUserInfoAction } from '../../redux/actions/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/login.less'
import logo from '../../static/imgs/logo.png'
class Login extends Component {
  render() {
    const onFinish = async values => {
      const { username, password } = values
      const result = await reqLogin(username, password)
      const { status, data } = result
      if (status === 0) {
        this.props.saveUserInfo(data)
        message.success('Login Success', 1)
        this.props.history.push('/admin/home')
      } else {
        message.warn('用户名或密码错误', 1)
      }
    }
    const onFinishFailed = (errorInfo) => {
      message.error('表单输入有误，请检查')
    };
    const { isLogin } = this.props
    if ( !isLogin ) {
      return (
        <div className="login">
          <header>
            <img src={logo} alt="logon" />
            <h1>商品管理系统</h1>
          </header>
          <section>
            <h1>用户登录</h1>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (value === undefined) {
                          reject('请输入用户名')
                        } else {
                          if (value.length > 10) {
                            reject('最长为十位')
                          } else if (value.length < 5) {
                            reject('最短为五位')
                          } else {
                            resolve()
                          }
                        }
                      })
                    }
                  }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="UserName" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码'
                  },
                  {
                    min: 5,
                    message: '最少五位'
                  },
                  {
                    max: 10,
                    message: '最长十位'
                  }
                ]}
              >
                <Input.Password placeholder="PassWord" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="btn" htmlType="submit">
                  登录
              </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      )
    } else {
      return <Redirect to="/admin/home" />
    }
  }
}
export default connect(
  state => ({ isLogin: state.userInfo.isLogin }),
  // dispatch => {
  //   return {
  //     addState1: data => dispatch(test1(data)),
  //     addState2: data => dispatch(test2(data))
  //   }
  // }
  {
    saveUserInfo: createSaveUserInfoAction
  }
)(Login)