/**
 * Access.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // targetType: { type: 'string' },

    // targetId: { type: 'number' },

    owner: {
      model: 'user'
    },

    friend: {
      model: 'user'
    },

    achievements: {
      collection: 'achievement',
      via: 'accesses'
    },
  },



};

