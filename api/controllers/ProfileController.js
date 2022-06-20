const isProduction = process.env.NODE_ENV === 'production';

/**
 * ProfileController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global User, Friendship, isProduction, Access, Achievement */

module.exports = {

  me: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;

    const user = await User
      .findOne({ id: meId })
      .populate('actions')
      .populate('achievements');

    const response = {
      actions: user.actions,
      achievements: user.achievements,
      lastSeenAt: user.lastSeenAt,
      createdAt: user.createdAt,
      fullName: user.fullName,
      avatar: user.avatar,
    };

    return res.json(response);
  },


  update: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    console.log(req.body);
    if (req.body && req.body.avatar) {
      const user = await User
        .updateOne({ id: meId })
        .set({ avatar: req.body.avatar });
    }

    return res.ok();
  },


  find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const userId = req.params.id;

    // TODO: this is not what it should be
    const friendshipFromMe = await Friendship.find({ user: meId, friend: userId, isConfirmed: true });
    const friendshipToMe = await Friendship.find({ user: userId, friend: meId, isConfirmed: true });
    // console.log(friendshipFromMe, friendshipToMe);

    if (!friendshipFromMe.length && !friendshipToMe.length) return res.send(404);

    const user = await User
      .findOne({ id: userId })
      .populate('actions')
      .populate('achievements');

    let sharedAchievements = [];
    try {
      const access = await Access.findOne({
        owner: userId,
        friend: meId
      }).populate('achievements').decrypt();
      sharedAchievements = access.achievements;
    } catch (error) {
      console.error(error);
    }

    const response = {
      actions: user.actions.length,
      achievements: user.achievements.length,
      friendships: friendshipFromMe.concat(friendshipToMe).length,
      lastSeenAt: user.lastSeenAt,
      createdAt: user.createdAt,
      fullName: user.fullName,
      avatar: user.avatar,
      sharedAchievements
    };

    return res.json(response);
  },

  /*find: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
    const ach = await Achievement.findOne({ id: req.params.id }).decrypt().populate('actions');
    return res.json(ach);
  },*/
};
