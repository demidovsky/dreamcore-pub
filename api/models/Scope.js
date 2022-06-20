/**
 * Scope.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', encrypt: true },

    notes: { type: 'string' },

    picture: { type: 'string' },

    user: {
      model: 'user'
    },

    achievements: {
      collection: 'achievement',
      via: 'scope'
    },

    actions: {
      collection: 'action',
      via: 'scope'
    },

  }

};

