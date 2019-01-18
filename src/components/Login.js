import React, { Component } from 'react';
import { connect } from 'react-redux'
import { tabChange, checkToken } from '../reduxSaga/actionCreator';
import { Form, Icon, Input, Button } from 'antd';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    }
  }

  componentWillMount() {
    const token = this.props.token;
    if (token.success) {
      this.props.history.replace('/user')
    } else {
      this.props.tabChange('login');
    }
  }

  componentWillReceiveProps(currProps, nextProps) {
    if (currProps.token.success) {
      localStorage.setItem("token", JSON.stringify(currProps.token));
      this.props.history.replace('/user')
    }
  }

  tokenChange = (v) => {
    this.setState({
      token: v.target.value
    })
  }

  handleSubmit() {
    const { token } = this.state;
    this.props.checkToken(token);
  }

  render() {
    return (
      <div className="login__wrap">
        <Form className="login-form">
          <Form.Item>
            <Input 
              onChange={this.tokenChange}
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入accesstoken" />
          </Form.Item>
          <Button
            onClick={this.handleSubmit.bind(this)}
            size="large"
            type="primary"
            className="login-form-button">
            登录
          </Button>
        </Form>
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
    checkToken: (params) => {
      dispatch(checkToken(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);