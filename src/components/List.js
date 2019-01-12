import React, { Component } from 'react';
import { getTopics } from '../services/apis';
class List extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const params = {
      page: 1,
      tab: 'all',
      limit: 40,
      mdrender: true
    }
    getTopics(params).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="list__wrap">
        
      </div>
    )
  }
}

export default List;