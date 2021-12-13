const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')


User.hasMany(Post, )

// should have a user_id foreign key
Post.hasOne(User, )

Post.hasMany(Comment, )


// Should have a post_id foreign key
Comment.hasOne(Post, )   



module.exports = { User, Post, Comment };
