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

export default function * () {
  yield fork(tabChange);
  yield fork(getTopicList);
  yield fork(getTopicDetail);
}