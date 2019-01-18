import axios from 'axios';
import { BASE_URL } from '../config';

const filterNullParams = (params) => {
  let newParams = {};
  let isArray = false;
  Object.keys(params).forEach(key => {
    isArray = Object.prototype.toString.call(params[key]).indexOf('Array') !== -1;
    if ( (isArray &&
      params[key].length >0) ||
      (!isArray && (!!params[key] ||
      params[key] === 0 ||
      params[key] === false)) ) {
      newParams[key] = params[key];
    }
  });
  return newParams;
}

const params2String = (params) => {
  let str = '';
  for (let key in params) {
    str += `&${key}=${params[key]}`
  }
  str = str.replace('&', '');
  return str;
}

//get /topics 主题首页
export const getTopics = (params) => {
  const newParams = filterNullParams(params);
  const str = params2String(newParams);
  return axios.get(`${BASE_URL}/topics?${str}`)
}

// get /topic/:id 主题详情
export const getTopicsDetail = (params) => {
  const str = params2String(params.params);
  return axios.get(`${BASE_URL}/topic/${params.id}?${str}`)
}

// post /topics 新建主题
export const sendNewArticle = (params) => {
  return axios.post(`${BASE_URL}/topics`, {
    ...params
  })
}

// post /topics/update 编辑主题
export const sendUpdateArticle = (params) => {
  return axios.post(`${BASE_URL}/topics/update`, {
    ...params
  })
}

// post /topic_collect/collect 收藏主题
export const sendCollectArticle = (params) => {
  return axios.post(`${BASE_URL}/topic_collect/collect`, {
    ...params
  })
}

// post /topic_collect/de_collect 取消主题
export const cancelCollectArticle = (params) => {
  return axios.post(`${BASE_URL}/topic_collect/de_collect`, {
    ...params
  })
}

// get /topic_collect/:loginname 用户所收藏的主题
export const getCollectList = (params) => {
  return axios.get(`${BASE_URL}/topic_collect/${params.loginname}`)
}

// post /topic/:topic_id/replies 新建评论
export const sendNewReplies = (topic_id, params) => {
  return axios.post(`${BASE_URL}/topic/${topic_id}/replies`, {
    ...params
  })
}

// post /reply/:reply_id/ups 为评论点赞
export const sendUpReplies = (reply_id, params) => {
  return axios.post(`${BASE_URL}/reply/${reply_id}/ups`, {
    ...params
  })
}

// get /user/:loginname 用户详情
export const getUserDetail = (loginname) => {
  return axios.get(`${BASE_URL}/user/${loginname}`)
}

// get /message/count 获取未读消息数
export const getMessageCount = (accesstoken) => {
  return axios.get(`${BASE_URL}/message/count`, {
    accesstoken
  })
}

// get /messages 获取已读和未读消息
export const getMessageList = (params) => {
  return axios.get(`${BASE_URL}/messages`, {
    ...params
  })
}

// post /message/mark_all 标记全部已读
export const sendMessageMarkAll = (accesstoken) => {
  return axios.post(`${BASE_URL}/message/mark_all`, {
    accesstoken
  })
}

// post /message/mark_one/:msg_id 标记单个消息为已读
export const sendMessageMarkOne = (msg_id, accesstoken) => {
  return axios.post(`${BASE_URL}/message/mark_one/${msg_id}`, {
    accesstoken
  })
}

// 登录验证
export const checkAccessToken = (accesstoken) => {
  return axios.post(`${BASE_URL}/accesstoken`, {
    accesstoken
  })
}