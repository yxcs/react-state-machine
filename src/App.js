import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Article from './components/Article';
import Author from './components/Author';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import List from './components/List';
import Login from './components/Login';
import User from './components/User';

import './App.css';
import './components/main.less';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header></Header> {/* 头部导航内容 */}
          <Content>         {/* Content来规范主题内容的整体样式，包含路由内容 */}
            <Switch>        {/* 用来渲染匹配地址的第一个<Route>或者<Redirect> */}
              <Redirect exact from="/" to="/home/all" />              {/* <Redirect> 跳转到home */}
              <Redirect exact from="/home" to="/home/all" />
              <Route path='/home/:tab' component={List}></Route>       {/* 匹配路由为 /home 的请求，显示List组件 */}
              <Route path='/article/:id' component={Article}></Route>
              <Route path='/author/:id' component={Author}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/user' component={User}></Route>
            </Switch>
          </Content>
          <Footer></Footer> {/* 页脚 © copyright等信息 */}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
