const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all user posts
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {posts});
    } catch (err) {
      res.redirect('login');
    }
  });

  module.exports = router;