import Flux from 'flux';
import TabStore from './store';
const Dispatcher = Flux.Dispatcher;
const AppDispatcher = new Dispatcher();

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case 'TAB_CHANGE':
      TabStore.tabChange(action.text);
      TabStore.emitChange();
      break;
    default:
      // no op
  }
})

export default AppDispatcher;