/**
 * Achievement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', encrypt: true },

    notes: {
      type: 'string',
      encrypt: true,
      columnType: 'text',
      allowNull: true
    },

    picture: { type: 'string' },

    year: { type: 'number' },

    user: {
      model: 'user'
    },

    scope: {
      model: 'scope'
    },

    actions: {
      collection: 'action',
      via: 'achievement'
    },

    accesses: {
      collection: 'access',
      via: 'achievements'
    },

    isCompleted: {
      type: 'boolean'
    }
  },



};

