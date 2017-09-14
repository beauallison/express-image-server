const fs = require('fs');

module.exports.image = () => fs.createReadStream(`${__dirname}/london.png`);
