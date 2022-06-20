const isProduction = process.env.NODE_ENV === 'production';

/**
 * AchievementController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Streak */

// const SkipperDisk = require('skipper-disk');
// const path = require('path');

module.exports = {

  list: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Streak.find({ user: meId }).decrypt();
    return res.json(result);
  },

  find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Streak.findOne({ id: req.params.id }).decrypt();
    return res.json(result);
  },
};
