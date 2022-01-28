const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');

// home routes
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User, {
        model: Comment,
        include: [User],
      }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage',
      {
        posts,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('postpage', { post });
    } else {
      res.status(400).json({ message: 'Post Not Found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard Route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = Post.findAll({
      where: { user_id: req.session.user_id },
      include: [User, {
        model: Comment,
        include: [User],
      }]
    })

    res.render('dashboard', {
      postData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page route
router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/dashboard')
      return;
    }
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});
// Signup Page Route
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout page route
router.get('/logout', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.render('logout');
    }
    else {
      res.status(400).json({ message: 'Try logging out again' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;