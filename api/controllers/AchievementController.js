const isProduction = process.env.NODE_ENV === 'production';

/**
 * AchievementController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Achievement */

module.exports = {

  list: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Achievement.find({ user: meId }).decrypt();
    return res.json(result);
  },

  find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Achievement.findOne({ id: req.params.id }).decrypt().populate('actions');
    return res.json(result);
  },

  update: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Achievement.updateOne({ id: req.params.id }).set(req.body);
    return res.json(result);
  },

  remove: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await Achievement.destroy({ id: req.params.id, user: meId });
    return res.json(result);
  },

  getLayout: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = (await User.findOne({ id: meId })).achievementsLayout;
    return res.json(result);
  },

  updateLayout: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const result = await User.updateOne({ id: meId }).set({ achievementsLayout: req.body.layout });
    return res.ok();
  },
};
