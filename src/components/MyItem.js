import React, { Component } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
class MyItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="list__item-wrap">
        <div className="list__item-avatar"><Link to={'/author/'+data.author.loginname}><Avatar src={data.author.avatar_url}></Avatar></Link></div>
        <div className="list__item--replay"><span className="reply">{data.reply_count}</span>/<span>{data.visit_count}</span></div>
        <div className="list__item--title"><span className={data.top||data.good?'green':''}>{data.tabTxt}</span><Link to={'/article/'+data.id}>{data.title}</Link></div>
        <div className="list__item--time">{data.replyAtTxt}</div>
      </div>
    )
  }
}

export default MyItem;