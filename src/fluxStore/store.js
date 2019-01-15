const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const TabStore = assign({}, EventEmitter.prototype, {
  tab: 'all',

  getTab: function () {
    return this.tab;
  },
  tabChange: function (text) {
    this.tab = text;
  },

  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
});

export default TabStore;