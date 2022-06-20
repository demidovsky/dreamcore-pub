const isProduction = process.env.NODE_ENV === 'production';

/**
 * Blueprint API Configuration
 * (sails.config.blueprints)
 *
 * For background on the blueprint API in Sails, check out:
 * https://sailsjs.com/docs/reference/blueprint-api
 *
 * For details and more available options, see:
 * https://sailsjs.com/config/blueprints
 */

module.exports.blueprints = {

  /***************************************************************************
  *                                                                          *
  * Automatically expose implicit routes for every action in your app?       *
  *                                                                          *
  ***************************************************************************/

  actions: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose RESTful routes for your models?                     *
  *                                                                          *
  ***************************************************************************/

  rest: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose CRUD "shortcut" routes to GET requests?             *
  * (These are enabled by default in development only.)                      *
  *                                                                          *
  ***************************************************************************/

  shortcuts: false,

  pluralize: true,

  parseBlueprintOptions(req) {
    var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);
    if (isProduction && !req.me) return queryOptions; else var meId = req.me ? req.me.id : 1;

    if (req.options.blueprintAction === 'create') {
      queryOptions.newRecord.user = meId;
    } else {
      if (req.me) {
        queryOptions.criteria.where.user = meId;
      }
    }

    if(!req.param('populate', false) && !queryOptions.alias) {
      queryOptions.populates = {};
    }
    return queryOptions;
  }

};
