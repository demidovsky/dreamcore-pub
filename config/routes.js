/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

/* NOTE: policies apply only to controllers and actions, not to views.
If you define a route in your routes.js config file that points directly to a view,
no policies will be applied to it. To make sure policies are applied,
you can instead define an action which displays your view, and point your route to that action. */

  'GET /':                   { action: 'view-homepage-or-redirect', locals: { layout: 'layouts/layout-landing' } },
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },
  'GET /app':                { action: 'dashboard/view-app', locals: { layout: 'layouts/layout-empty' } },
  'GET /app/*':              { action: 'dashboard/view-app', locals: { layout: 'layouts/layout-empty' }, skipAssets: true },

  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

  'GET /image/file/:filename': {
    controller: 'ImageController',
    action: 'file',
    skipAssets: false
  },

  'POST /image/upload': {
    controller: 'ImageController',
    action: 'upload',
    // skipAssets: false
  },


  'GET /achievements': 'AchievementController.list',
  'GET /achievements/:id': 'AchievementController.find',
  'DELETE /achievements/:id': 'AchievementController.remove',
  'PATCH /achievements/:id': 'AchievementController.update',

  'GET /layout/achievements': 'AchievementController.getLayout',
  'PATCH /layout/achievements': 'AchievementController.updateLayout',

  'GET /actions': 'ActionController.list',
  'GET /actions/:id': 'ActionController.find',
  'DELETE /actions/:id': 'ActionController.remove',

  'GET /scopes': 'ScopeController.list',
  'GET /scopes/:id': 'ScopeController.find',
  'DELETE /scopes/:id': 'ScopeController.remove',

  // 'GET /streaks': 'StreakController.list',
  // 'GET /streaks/:id': 'StreakController.find',

  'GET    /friends':     'FriendshipController.list',
  'POST   /friends':     'FriendshipController.add',
  // 'GET    /friends/:id': 'FriendshipController.find',
  'DELETE /friends/:id': 'FriendshipController.remove',
  'POST /friends/:id': 'FriendshipController.confirm',

  'POST /access/:module': 'AccessController.grant',
  'DELETE /access/:module': 'AccessController.revoke',
  'GET /access/:module/:id?': 'AccessController.check',

  // 'GET /friendships': 'FriendshipController.list',
  // 'GET /friendships/:id': 'FriendshipController.find',

  // 'GET    /profile/:id': 'ProfileController.find',
  'GET    /profile': 'ProfileController.me',
  'GET    /profile/:id': 'ProfileController.find',
  'PATCH  /profile': 'ProfileController.update',

  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

};
