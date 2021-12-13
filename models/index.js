const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')


User.hasMany(Post, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE', 
})

Post.belongsTo(User, {
    foreignkey: 'user_id',
})

Post.hasMany(Comment, {
    foreignkey: 'post_id',
    onDelete: 'CASCADE'
})

// Should have a post_id foreign key
Comment.belongsTo(Post, {
    foreignkey: 'post_id',
})   



module.exports = { User, Post, Comment };
