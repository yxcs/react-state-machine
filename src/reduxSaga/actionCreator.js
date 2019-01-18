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

export const checkToken = (payload) => {
  return {
    type: types.CHECK_ACCESS_TOKEN,
    payload
  }
}

export const setToken = (payload) => {
  return {
    type: types.SET_ACCESS_TOKEN,
    payload
  }
}

export const addCollection = (payload) => {
  return {
    type: types.ADD_COLLECTION,
    payload
  }
}

export const delCollection = (payload) => {
  return {
    type: types.DEL_COLLECTION,
    payload
  }
}

export const getAuthor = (payload) => {
  return {
    type: types.GET_AUTHOR,
    payload
  }
}