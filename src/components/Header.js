import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header__wrap">
        <div className="header__menu">
          <div><Link to="/home/all">首页</Link></div>
          <div><Link to="/home/good">精华</Link></div>
          <div><Link to="/home/share">分享</Link></div>
          <div><Link to="/home/ask">问答</Link></div>
          <div><Link to="/home/job">招聘</Link></div>
          <div><Link to="/home/test">测试</Link></div>
          <div><Link to="/login">登录</Link></div>
        </div>
      </div>
    )
  }
}

export default Header;