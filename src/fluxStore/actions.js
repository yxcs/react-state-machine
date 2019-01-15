import AppDispatcher from './dispatcher';

const onTabChange = (text) => {
  AppDispatcher.dispatch({
    actionType: 'TAB_CHANGE',
    text: text
  });
}
export default onTabChange;