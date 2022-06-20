const isProduction = process.env.NODE_ENV === 'production';

/**
 * AchievementController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Action */

// const SkipperDisk = require('skipper-disk');
// const path = require('path');

module.exports = {

  list: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Action.find({ user: meId }).decrypt();
    return res.json(result);
  },

  find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Action.findOne({ id: req.params.id }).decrypt();
    return res.json(result);
  },

  remove: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Action.destroy({ id: req.params.id, user: meId });
    return res.json(result);
  },
};
