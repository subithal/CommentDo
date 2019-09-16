var mongoose = require('mongoose');
var moment = require('moment');

function generateSlug() {

    let slug = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for ( let i = 0; i < 5; i++ ) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return slug;
}

const CommentSchema = new mongoose.Schema({
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        slug: { type: String},
        full_slug: {type: String},
        postedAt: {
            type:Date,
            default: Date.now
        },
        author: {type: String, lowercase: true, trim: true},
        text: {
            type:String
        }
});
CommentSchema.pre('save', function (next) {
    let comment = this;
    let timestamp = moment(comment.postedAt).format('YYYY.MM.DD.hh:mm:ss');
    let slug_part = generateSlug();
    let full_slug_part = timestamp + ':' + slug_part;
  
    if ( comment.parent_id ) {
      Comment.findOne({'_id': comment.parent_id }, { slug: 1, full_slug: 1 })
        .then(parent => {
          comment.slug = parent.slug + '/' + slug_part;
          comment.full_slug = parent.full_slug + '/' + full_slug_part;
          next();
        });
    } else {
      comment.slug = slug_part;
      comment.full_slug = timestamp + ':' + slug_part;
      next();
    }
  });
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
    Comment
}
