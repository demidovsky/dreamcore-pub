/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: 'mysql',
      port: 3306,
      user: 'root',
      password: '......',
      database: 'dreamcore_db',
      // database: 'db_production'
    },
  },

  models: {
    migrate: 'safe',
  },

  // blueprints: {
  //   shortcuts: false,
  // },

  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },
  },

  session: {
    adapter: 'connect-redis',
    host: 'redis',
    // host: 'localhost',
    port: 6379,
    db: 0,

    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },

  sockets: {
    onlyAllowOrigins: [
      'http://dreamcore.ru',
      'https://dreamcore.ru',
      // 'http://localhost',
    ],
  },

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: true,
  },

  port: 443,


  ssl: {
    ca: require('fs').readFileSync(require('path').resolve(__dirname,'./../../certs/dreamcore.ru/fullchain.pem')),
    key: require('fs').readFileSync(require('path').resolve(__dirname,'./../../certs/dreamcore.ru/privkey.pem')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'./../../certs/dreamcore.ru/fullchain.pem'))
  },

  custom: {
    // baseUrl: 'http://localhost',
    baseUrl: 'https://dreamcore.ru',
    internalEmailAddress: '...@.......',

    // mailgunDomain: 'mg.example.com',
    // mailgunSecret: 'key-prod_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sails_custom__mailgunDomain=mg.example.com
    // sails_custom__mailgunSecret=key-prod_fake_bd32301385130a0bafe030c
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

  },



};
