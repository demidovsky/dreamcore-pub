const isProduction = process.env.NODE_ENV === 'production';

/**
 * AchievementController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Scope */

// const SkipperDisk = require('skipper-disk');
// const path = require('path');

module.exports = {

  list: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Scope.find({ user: meId }).decrypt();//.populate('achievements');
    return res.json(result);
  },

  find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Scope.findOne({ user: meId, id: req.params.id }).decrypt();//.populate('achievements');
    return res.json(result);
  },

  remove: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Scope.destroy({ user: meId, id: req.params.id });
    return res.json(result);
  },
};
