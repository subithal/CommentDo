var mongoose = require('mongoose');
var {Comment} = require('./Comment');
const DB_CONNEECTION_STRING = "mongodb://localhost:27017/CommentDB"

const connectDb = () => {
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(DB_CONNEECTION_STRING,{ useNewUrlParser: true });
};

const models = { Comment };
module.exports = { connectDb,models };
