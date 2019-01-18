import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Avatar } from 'antd';
import { getAuthor } from '../reduxSaga/actionCreator';
import { getDateDiff } from '../utils/tool';
class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      author: {}
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id || 0;
    this.setState({
      id
    })
    this.props.getAuthor(id)
  }

  componentWillReceiveProps(currProps, nextProps) {
    const author = currProps.author;
    console.log(author)
    author.registerTime = getDateDiff(author.create_at);
    this.setState({
      author
    })
  }

  render() {
    const { author } = this.state;
    return (
      <div className="author__wrap">
        <div className="author__header">
          <img src={author.avatar_url}></img>
          {author.loginname}
        </div>
        <div className="author__item">{author.score} 积分</div>
        {
          !!author.githubUsername ? 
            <div className="author__item">github: <a target="_blank" href={'https://github.com/'+author.githubUsername}>{author.githubUsername}</a></div> 
            : ''
        }
        <div className="author__item">注册时间  {author.registerTime}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAuthor: (id) => {
      dispatch(getAuthor(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Author);