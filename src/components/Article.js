import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { getTopicDetail, addCollection, delCollection } from '../reduxSaga/actionCreator';
import { getDateDiff } from '../utils/tool';
import { TAB } from '../config';

import './markdown.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      topicDetail: {
        author: {loginname: ''}
      },
      isLogin: false,
      token: ''
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id || 0;
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    this.setState({ id, isLogin: token.success || false });
    const params = {
      mdrender: true,
    }
    if (!!token && token.success) {
      params.accesstoken = token.accesstoken;
    }
    this.setState({ token });
    this.props.getTopicDetail(id, params);
  }
  componentWillReceiveProps(currProps, nextProps) {
    const topicDetail = currProps.topicDetail;
    if (topicDetail.top) {
      topicDetail.tabTxt = '置顶';
    } else if (topicDetail.good) {
      topicDetail.tabTxt = '精华';
    } else if(!!topicDetail.tab) {
      topicDetail.tabTxt = TAB[topicDetail.tab]
    } else {
      topicDetail.tabTxt = '其他';
    }
    topicDetail.timeTxt = getDateDiff(topicDetail.last_reply_at);
    topicDetail.createTimeTxtCreate = getDateDiff(topicDetail.create_at);

    this.setState({
      topicDetail: currProps.topicDetail
    })
  }

  onCollect() {
    const { id, token, topicDetail } = this.state;
    const params = {
      accesstoken: token.accesstoken,
      topic_id: id
    }
    this.props.addCollection(params)
    topicDetail.is_collect = true;
    this.setState({ topicDetail });
  }

  onDelCollect() {
    const { id, token, topicDetail } = this.state;
    const params = {
      accesstoken: token.accesstoken,
      topic_id: id
    }
    this.props.delCollection(params)
    topicDetail.is_collect = false;
    this.setState({ topicDetail });
  }
  render() {
    const { topicDetail, isLogin } = this.state;
    return (
      <div className="article__wrap"> 
        <div className="article__header">
          <div className="article__header--title">
            <Button size="small" type="primary">{topicDetail.top?'置顶':(topicDetail.good?'精华':'')}</Button>
            {topicDetail.title}
          </div>
          <div className="article__header--desc">
            <div className="article__header--txt">
             · 发布于 {topicDetail.timeTxt}  · 作者 {topicDetail.author && topicDetail.author.loginname}  · {topicDetail.timeTxt} 次浏览  · 最后一次编辑是{topicDetail.createTimeTxtCreate}  · 来自 {TAB[topicDetail.tab]}</div>
            {
              isLogin ? (
                <div className="article__header--collect">
                  {topicDetail.is_collect ? <Button onClick={this.onDelCollect.bind(this)}>已收藏</Button> : <Button onClick={this.onCollect.bind(this)} type="primary">收藏</Button>}
                </div>
              ) : ''
            }
          </div>
        </div>
        <div className="line"></div>
        <div className="article__content" dangerouslySetInnerHTML={{ __html: topicDetail.content }}></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTopicDetail: (id, params) => {
      dispatch(getTopicDetail({id, params}))
    },
    addCollection: (params) => {
      dispatch(addCollection(params))
    },
    delCollection: (params) => {
      dispatch(delCollection(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);