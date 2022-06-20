const isProduction = process.env.NODE_ENV === 'production';

/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* global Image */

const SkipperDisk = require('skipper-disk');
const path = require('path');

module.exports = {

  /**
   * Upload image for entry
   *
   * (POST /image/upload)
   */
  upload: function (req, res) {
    req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    }, async function (err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) { // || !uploadedFiles[0].fd) {
        return res.badRequest('No file was uploaded');
      }
      const filename = uploadedFiles[0].fd.match(/[^/]+$/)[0];
      await Image.create({ filename });
      res.send({ url: `/image/file/${filename}` });
    });
  },


  /**
   * Download image with specified name
   *
   * (GET /img/file/:filename)
   */
  file: async function (req, res) {
    const filename = req.param('filename');
    const imagePath = path.join(sails.config.paths.tmp, 'uploads', filename || 'no.jpg');
    const fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the entry uploaded
    // res.set('Content-disposition', `attachment; filename='${image.filename}'`);
    res.set('Content-disposition', 'inline');

    // Stream the file down
    fileAdapter.read(imagePath)
      .on('error', function (err) {
        return res.serverError(err);
      })
      .pipe(res);
  },



  /*list: function (req, res) {
    Image.find().exec(function (err, items) {
      if (err) return res.negotiate(err);
      res.send(items);
    });
  }*/
};
