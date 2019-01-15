import React, { Component } from 'react';
import { TAB } from '../config';
import { getDateDiff } from '../utils/tool';
import { Pagination, Spin } from 'antd';
import MyItem from './MyItem';

import { connect } from 'react-redux'
import { tabChange, getTopicList } from '../reduxSaga/actionCreator';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'all',
      page: 1,
      total: 83,
      pageSize: 40,
      list: []
    }
  }

  componentWillMount() {
    const tab = this.props.match.params.tab || 'all';
    this.setState({ tab });
    this.props.tabChange(tab);
    this.getList();
  }
  componentWillReceiveProps(currProps, nextProps) {
    if (currProps.topicList) {
      let list = currProps.topicList.data;
      if (!this.state.list.length || list[0].id !== this.state.list[0].id) {
        list = list.map(item => {
          if (item.top) {
            item.tabTxt = '置顶';
          } else if (item.good) {
            item.tabTxt = '精华';
          } else if(!!item.tab) {
            item.tabTxt = TAB[item.tab]
          } else {
            item.tabTxt = '其他';
          }
          item.reply_at = getDateDiff(item.last_reply_at);
        })
        this.setState({
          list: currProps.topicList.data,
          page: currProps.topicList.page
        })
      }
    }
  }
  getList() {
    const { page, tab } = this.state;
    const params = {
      page,
      tab,
      limit: 40,
      mdrender: true
    }
    this.setState({ list: [] });
    this.props.getTopicList(params);
  }
  pageChange(page, pageSize) {
    this.setState({
      page
    }, _ => {
      this.getList();
    });
  }

  render() {
    const { list, page, total, pageSize } = this.state;
    return (
      <div className="list__wrap">
        {
          list.map(item => <MyItem key={item.id} data={item}></MyItem>)
        }
        {
          list.length ? (
            <div className="list__wrap-page">
              <Pagination pageSize={pageSize} defaultCurrent={1} current={page} total={total * pageSize} onChange={this.pageChange.bind(this)} />
            </div> 
          ) : <div className="list__laoding"><Spin size="large" /></div>
        }
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
    getTopicList: (params) => {
      dispatch(getTopicList(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);