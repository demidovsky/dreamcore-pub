module.exports = {


  friendlyName: 'View app page',


  description: 'Display the dashboard "app" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/app',
      description: 'Display the app page for authenticated users.'
    },

  },


  fn: async function () {

    return {};

  }


};
