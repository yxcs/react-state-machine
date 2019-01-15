import React, { Component } from 'react';
import { getTopics } from '../services/apis';
import { TAB } from '../config';
import { getDateDiff } from '../utils/tool';
import { Pagination } from 'antd';
import MyItem from './MyItem';

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

  componentDidMount() {
    const { tab } = this.props.match.params;
    
  }
  componentWillUnmount() {
    
  }
  getTopicList(page) {
    const { tab, pageSize } = this.state;
    const params = {
      page,
      tab,
      limit: pageSize,
      mdrender: true
    }
    getTopics(params).then(res => {
      if (res.status === 200 && res.data.success) {
        let list = res.data.data;
        list = list.map(item => {
          item.tabTxt = '其他';
          if (item.top) {
            item.tabTxt = '置顶';
          } else if (item.good) {
            item.tabTxt = '精华';
          } else if (item.tab) {
            item.tabTxt = TAB[item.tab];
          }
          item.replyAtTxt = getDateDiff(item.last_reply_at);
          return item;
        })
        this.setState({ list });
      }
    })
  }
  onPageChange(page, pageSize) {
    this.setState({ page });
    this.getTopicList(page);
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
              <Pagination pageSize={pageSize} defaultCurrent={1} current={page} total={total * pageSize} onChange={this.onPageChange.bind(this)} />
            </div> 
          ) : ''
        }
      </div>
    )
  }
}

export default List;