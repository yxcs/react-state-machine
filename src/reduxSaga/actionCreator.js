import * as types from './types.js';

export const tabChange = (payload) => {
  return {
    type: types.TAB_CHANGE,
    payload
  }
}

export const getTopicList = (payload) => {
  return {
    type: types.GET_TOPIC_LIST,
    payload
  }
}

export const getTopicDetail = (payload) => {
  return {
    type: types.GET_TOPIC_DETAIL,
    payload
  }
}