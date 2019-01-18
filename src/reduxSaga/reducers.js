import * as types from './types'
import { combineReducers } from 'redux'
// import { List } from 'immutable';

const tab = (state = 'all', action) => {
  switch (action.type) {
    case types.TAB_CHANGE_SUCCESS:
      return action.data
    default:
      return state
  }
}

const topicList = (state = {data: [], page: 1}, action) => {
  switch (action.type) {
    case types.GET_TOPIC_LIST_SUCCESS:
      let lists = [];
      lists.push(...action.payload.data)
      return {data: lists, page: action.payload.page};
    default:
      return state
  }
}

const topicDetail = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TOPIC_DETAIL_SUCCESS:
      const detail = {...action.payload};
      return detail;
    default:
      return state
  }
}

const token = (state = {
    avatar_url: '',
    id: '',
    loginname: '',
    success: false
  }, action) => {
    switch (action.type) {
      case types.CHECK_ACCESS_TOKEN_SUCCESS:
        const token = {...action.payload};
        return token;
      default:
        return state
    }
}

const author = (state = {
  avatar_url: '',
  create_at: '',
  githubUsername: '',
  loginname: '',
  recent_replies: [],
  recent_topics: [],
  score: 0
}, action) => {
  switch (action.type) {
    case types.GET_AUTHOR_SUCCESS:
      const author = {...action.payload};
      return author;
    default:
      return state
  }
}

const app = combineReducers({
  tab,
  topicList,
  topicDetail,
  token,
  author
})

export default app