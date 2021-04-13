import React, { Component } from 'react';
import { Button, Modal } from 'antd'
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' // 将一个非路由组件 修饰成路由组件
import dayjs from 'dayjs'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { createDeleteUserInfoAction } from '../../../redux/actions/login'
import { reqWeather } from '../../../api/index'
import './css/header.less'
class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format('YYYY年 MM月-DD日 HH:MM:ss'),
    weather: {}
  }
  // Logout callback
  handleLogout = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to exit?',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.deleteUserInfo()
      }
    });
  }
  // 点击全屏/取消全屏的回调
  handleChangeScreen = () => {
    screenfull.toggle()
  }
  // 获取天气的回调
  getWeather = async () => {
    const result = await reqWeather()
    const temperature = result.data.result.daily.temperature[0]
    const skycon = result.data.result.daily.skycon[0]
    this.setState({
      weather:{
        min: temperature.min,
        max: temperature.max,
        skycon: skycon.value
      }
    })
  }
  componentDidMount() {
    // 监听全屏的change事件
    screenfull.on('change', () => {
      this.setState({
        isFull: !this.state.isFull
      })
    })
    this.timer = setInterval(() => {
      this.setState({
        date: dayjs().format('YYYY年 MM月-DD日 HH:MM:ss')
      })
    }, 1000)
    this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    const { skycon, min, max } = this.state.weather
    const baseImgUrl = 'http://api.map.baidu.com/images/weather/day/'
    return (
      <header className="header">
        <div className="header-top">
          <Button onClick={this.handleChangeScreen} icon={this.state.isFull ? < FullscreenExitOutlined /> : <FullscreenOutlined />}>
          </Button>
          <span className="username" >欢迎，{this.props.userInfo.user.username}</span>
          <Button type="link" onClick={this.handleLogout} >
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            { this.props.location.pathname }
          </div>
          <div className="bottom-right">
            { this.state.date }
            <img src = {
              skycon === 'PARTLY_CLOUDY_DAY' ? baseImgUrl + 'yin.png':
              skycon === 'LIGHT_RAIN' ? baseImgUrl + 'xiaoyu.png' :
              skycon === 'MODERATE_RAIN' ? baseImgUrl + 'zhongyu.png' :
              skycon === 'CLEAR_DAY' ? baseImgUrl + 'qing.png' :
              skycon === 'HEAVY_RAIN' ? baseImgUrl + 'dayu.png' :
              skycon === 'CLOUDY' ? baseImgUrl + 'duoyun.png' : 'yin.png'
            } alt="天气信息" />
            { skycon === 'PARTLY_CLOUDY_DAY' ? '部分阴天':
              skycon === 'CLOUDY' ? '多云' :
              skycon === 'LIGHT_RAIN' ? '小雨' :
              skycon === 'MODERATE_RAIN' ? '中雨' :
              skycon === 'CLEAR_DAY' ? '晴天' :
              skycon === 'HEAVY_RAIN' ? '大雨' : '未知'}
            温度 { min } ~ { max } 度
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  state => ({ userInfo: state.userInfo }),
  {
    deleteUserInfo: createDeleteUserInfoAction
  }
)(withRouter(Header))