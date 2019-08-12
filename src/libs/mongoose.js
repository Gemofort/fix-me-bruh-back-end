const mongoose = require('mongoose');
const config = require('config');
const beautifulUnique = require('mongoose-beautiful-unique-validation');

mongoose.connect(config.get('databaseUrl'), {
  useNewUrlParser: true,
  useCreateIndex: true,
})
  .catch((err) => {
    console.log(err);
  });

mongoose.plugin(beautifulUnique);

module.exports = mongoose;
