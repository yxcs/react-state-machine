import React, { Component } from 'react';
import { connect } from 'react-redux'
import { tabChange, setToken } from '../reduxSaga/actionCreator';
import { Avatar, Button } from 'antd';
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    }
  }

  componentWillMount() {
    const token = this.props.token;
    if (!token.success) {
      this.props.history.replace('/login')
    } else {
      this.props.tabChange('user');
      this.setState({
        token
      })
    }
  }

  clearStorrage() {
    localStorage.removeItem('token');
    this.props.setToken({
      avatar_url: '',
      id: '',
      loginname: '',
      success: false
    })
    this.props.history.replace('/login')
  }

  render() {
    const { token } = this.state;
    return (
      <div className="user__wrap">
        <div className="li">
          <span className="label">用户：</span>
          <span className="value">{token.loginname}</span>
        </div>
        <div className="li">
          <span className="label">头像：</span>
          <Avatar className="avatar" src={token.avatar_url}></Avatar >
        </div>
        <div className="li">
          <span className="label">Token：</span>
          <span className="value">{token.accesstoken}</span>
        </div>
        <div className="li">
          <Button onClick={this.clearStorrage.bind(this)} type="danger">退出登录</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tabChange: (params) => {
      dispatch(tabChange(params))
    },
    setToken: (params) => {
      dispatch(setToken(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);