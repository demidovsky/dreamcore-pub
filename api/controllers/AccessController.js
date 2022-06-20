const assert = require('assert');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * AccessController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Access */

module.exports = {

  grant: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const { friendId, itemId } = req.body;
    assert(meId !== friendId);
    assert(friendId);
    const module = req.params.module;
    const pair = { owner: meId, friend: friendId };
    const access = await Access.findOrCreate(pair, pair);
    const result = await Access.addToCollection(access.id, module, itemId);
    return res.json({ friendId, itemId });
  },

  revoke: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const { friendId, itemId } = req.body;
    assert(meId !== friendId);
    assert(friendId);
    const module = req.params.module;
    const pair = { owner: meId, friend: friendId };
    const access = await Access.findOne(pair);
    assert(access);
    const result = await Access.removeFromCollection(access.id, module, itemId);
    return res.json({ friendId, itemId });
  },

  check: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const { module, id } = req.params;
    const access = await Access
      .find({ owner: meId })
      .populate(module, { select: ['id'] });

    let result = access.map(item => ({
      friend: item.friend,
      [module]: _.map(item[module], 'id')
    }));

    if (id) {
      result = {
        friends: _.map(result.filter(item => item[module].includes(parseInt(id))), 'friend')
      };
    }

    return res.json(result);
  },

};
