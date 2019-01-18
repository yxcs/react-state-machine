import { take, fork, put, call, takeLatest } from 'redux-saga/effects'
import * as types from './types'
import * as api from '../services/apis'

import { Message } from 'antd'

function * tabChange () {
  while(true) {
    try {
      let action = yield take(types.TAB_CHANGE)
      yield put({
        type: types.TAB_CHANGE_SUCCESS,
        data: action.payload
      })
    } catch (error) {
      
    }
  }
}

function * getTopicList () {
  while(true) {
    try {
      let action = yield take(types.GET_TOPIC_LIST)
      let params = action.payload
      let res = yield call(api.getTopics, params)
      if (res.status === 200 && res.data.data) {
        yield put({
          type: types.GET_TOPIC_LIST_SUCCESS,
          payload: {
            data: res.data.data,
            page: params.page
          }
        })
      } else {
        yield put({
          type: types.GET_TOPIC_LIST_ERROR
        })
      }
    } catch (error) {
      Message.error('服务器异常，请稍后重试！')
      console.log(error)
      yield put({
        type: types.GET_TOPIC_LIST_ERROR
      })
    }
  }
}

function * getTopicDetail () {
  while(true) {
    try {
      let action = yield take(types.GET_TOPIC_DETAIL)
      let params = action.payload
      let res = yield call(api.getTopicsDetail, params)
      if (res.status === 200 && res.data.data) {
        yield put({
          type: types.GET_TOPIC_DETAIL_SUCCESS,
          payload: res.data.data
        })
      } else {
        yield put({
          type: types.GET_TOPIC_DETAIL_ERROR
        })
      }
    } catch (error) {
      Message.error('服务器异常，请稍后重试！')
      console.log(error)
      yield put({
        type: types.GET_TOPIC_DETAIL_ERROR
      })
    }
  }
}

function * checkToken () {
  while(true) {
    try {
      let action = yield take(types.CHECK_ACCESS_TOKEN)
      let params = action.payload
      let res = yield call(api.checkAccessToken, params)
      if (res.status === 200 && res.data.success) {
        yield put({
          type: types.CHECK_ACCESS_TOKEN_SUCCESS,
          payload: {
            ...res.data,
            accesstoken: params
          }
        })
      } else {
        yield put({
          type: types.CHECK_ACCESS_TOKEN_ERROR
        })
      }
    } catch (error) {
      Message.error('登录失败，请验证token')
      yield put({
        type: types.CHECK_ACCESS_TOKEN_ERROR
      })
    }
  }
}

function * setToken () {
  while(true) {
    try {
      let action = yield take(types.SET_ACCESS_TOKEN)
      let params = action.payload
      yield put({
        type: types.CHECK_ACCESS_TOKEN_SUCCESS,
        payload: {
          ...params
        }
      })
       
    } catch (error) {
      yield put({
        type: types.CHECK_ACCESS_TOKEN_ERROR
      })
    }
  }
}

function * addCollection () {
  while(true) {
    try {
      let action = yield take(types.ADD_COLLECTION)
      let params = action.payload
      let res = yield call(api.sendCollectArticle, params)
      if (res.status === 200 && res.data.success) {
        yield put({
          type: types.ADD_COLLECTION_SUCCESS,
          payload: {
            ...res.data,
            accesstoken: params
          }
        })
      } else {
        yield put({
          type: types.ADD_COLLECTION_ERROR
        })
      }
    } catch (error) {
      yield put({
        type: types.ADD_COLLECTION_ERROR
      })
    }
  }
}

function * delCollection () {
  while(true) {
    try {
      let action = yield take(types.DEL_COLLECTION)
      let params = action.payload
      let res = yield call(api.cancelCollectArticle, params)
      if (res.status === 200 && res.data.success) {
        yield put({
          type: types.DEL_COLLECTION_SUCCESS,
          payload: {
            ...res.data
          }
        })
      } else {
        yield put({
          type: types.DEL_COLLECTION_ERROR
        })
      }
    } catch (error) {
      yield put({
        type: types.DEL_COLLECTION_ERROR
      })
    }
  }
}

function * getAuthor () {
  while(true) {
    try {
      let action = yield take(types.GET_AUTHOR)
      let params = action.payload
      let res = yield call(api.getUserDetail, params)
      if (res.status === 200 && res.data.success) {
        yield put({
          type: types.GET_AUTHOR_SUCCESS,
          payload: {
            ...res.data.data
          }
        })
      } else {
        yield put({
          type: types.GET_AUTHOR_ERROR
        })
      }
    } catch (error) {
      yield put({
        type: types.GET_AUTHOR_ERROR
      })
    }
  }
}

export default function * () {
  yield fork(tabChange);
  yield fork(getTopicList);
  yield fork(getTopicDetail);
  yield fork(checkToken);
  yield fork(setToken);
  yield fork(addCollection);
  yield fork(delCollection);
  yield fork(getAuthor);
}