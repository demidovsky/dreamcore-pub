const isProduction = process.env.NODE_ENV === 'production';

/**
 * FriendController
 *
 * @description :: Server-side logic for managing achievements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Friendship */

module.exports = {


  // TODO: переписать
  // У дружбы 4 состояния:
  // - от меня, неподтвержденная
  // - ко мне, неподтвержденная
  // - от меня, подтвержденная
  // - ко мне, подтвержденная
  list: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;

    const friendshipsFromMe = await Friendship.find({ user: meId });

    const friendshipsToMe = await Friendship.find({ friend: meId });

    let allFriendships = friendshipsFromMe.concat(friendshipsToMe);
    if (req.query && req.query.confirmed) allFriendships = allFriendships.filter(item => item.isConfirmed);

    const friends = _.sortBy(allFriendships, 'isConfirmed').reverse().map(async friendship => {
      let friendshipType = null;
      let friendId = null;

      if (friendship.isConfirmed) {
        if (friendship.user === meId) {
          friendshipType = 'confirmed';
          friendId = friendship.friend;
        }
        if (friendship.friend === meId) {
          friendshipType = 'confirmed';
          friendId = friendship.user;
        }
      } else {
        if (friendship.user === meId) {
          friendshipType = 'from_me';
          friendId = friendship.friend;
        }
        if (friendship.friend === meId) {
          friendshipType = 'to_me';
          friendId = friendship.user;
        }
      }

      let userData = {
        isConfirmed: friendship.isConfirmed,
        fullName: friendship.request,
        friendshipType,
        friendshipId: friendship.id
      };
      const user = await User.findOne({ id: friendId }).populate('achievements');
      if (user && (friendshipType === 'to_me' || friendship.isConfirmed)) {

        var userFriends = await Friendship.count({
          or: [{ user: friendId }, { friend: friendId }],
          isConfirmed: true
        });

        userData = {
          isConfirmed: friendship.isConfirmed,
          avatar: user.avatar,
          fullName: user.fullName,
          achievements: user.achievements.length,
          completed: user.achievements.filter(item => item.isCompleted).length,
          friends: userFriends,
          friendshipId: friendship.id,
          friendSince: friendship.updatedAt,
          friendshipType,
          friendId,
        };
      }


      /*switch (friendshipType) {
        case 'confirmed':
          userData.isConfirmed = true;
        case 'to_me':
          userData.isConfirmed = false;
          userData.friendshipType = friendshipType;
          return userData;
        case 'from_me':
        default:
          userData.friendshipType = friendshipType;
      }*/

      return userData;
    });

    const response = await Promise.all(friends);
    return res.json(response);
  },


  remove: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;

    const friendship = await Friendship.findOne({ id: req.params.id });
    if (friendship && (friendship.user === meId || friendship.friend === meId)) {
      await Friendship.destroy({ id: req.params.id });
      return res.ok();
    } else {
      return res.badRequest();
    }
  },

  add: async function (req, res) {
    if (!req.body.request) res.send(500);
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;

    const friend = await User.findOne({ fullName: req.body.request });

    const f = await Friendship.create({
      user: meId,
      friend: friend ? friend.id : null,
      request: '' + req.body.request
    }).fetch();
    return res.send(f);
  },

  // find: async function (req, res) {
  //   const meId = req.me ? req.me.id : 1;
  //   if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;
  //   const friendships = await Friendship.find({ user: req.params.id });//.populate('friend');

  //   return res.json(friendships);
  // },

  confirm: async function (req, res) {
    if (isProduction && !req.me) return res.unauthorized(); else var meId = req.me ? req.me.id : 1;

    console.log(req.params);
    const friendship = await Friendship.findOne({ id: req.params.id });
    if (friendship && friendship.friend === meId) {
      await Friendship.updateOne({ id: req.params.id }).set({ isConfirmed: true });
      return res.ok();
    } else {
      return res.badRequest();
    }
  },
};
