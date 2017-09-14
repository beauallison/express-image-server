const model = require('./model');

let images;
(async () => {
  images = await model();
})();

/**
 * /images router.
 *
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {Function} next - Next.
 */
module.exports.getImage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const image = await images.getImage({ id });
    return res.write(image);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await images.deleteImage({ id });
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};
