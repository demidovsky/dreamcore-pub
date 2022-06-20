/**
 * Action.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', encrypt: true },

    user: {
      model: 'user'
    },

    achievement: {
      model: 'achievement',
    },

    scope: {
      model: 'scope'
    },

    streaks: {
      collection: 'streak',
      via: 'action'
    },
  }

};

