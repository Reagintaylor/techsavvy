const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')    // auhtorization


// create a user function

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
   // making sure the user is logged in
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logged in function
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logging out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//  comment routes
// creating a comment, withAuth added to ensure the user is loggedin before they can create a comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    let newComment = await  Comment.create({
      name: req.body.name,
      comment: req.body.comment,
      date: req.body.date,
      post_id: req.body.post_id
    });

    const newPost = await Post.findByPk(req.body.post_id, {
      include : [
        {
          model: Comment,
          attributes: [
            'id',
            'name', 
            'comment',
            'date',
          ]
        }
      ]
    });

    const post = newPost.get({ plain: true});
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// comment delete
router.delete('/:id', withAuth, (req, res) => {
  try{
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletePost => {
      if (!deletePost) {
        res.status(400).json();
        return;
      }
    })

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
})

//comment update
router.post('/', withAuth, (req, res) => {
  try{
    if(req.session) {
      Comment.create({
        comment: req.body.comment,
        name: req.session.name,
        id: req.body.id,
        date: req.body.date
      })
      .then(commentData => res.json(commentData))
    } 
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// new post

router.post('/newpost', withAuth, async (req, res) => {
  try {
    let newPost = await Post.create({
      title: req.body.title,
      author: req.body.author,
      date: req.body.date,
      post: req.body.post,
      user_id: req.body.user_id,
    });
  
    newPost = await Post.findAll({
      attributes: [
        'id',
        'title',
        'author',
        'date',
        'post'
      ]
    });

    const posts = newPost.map((post) => post.get({ plain: true })
    );

    res.status(200).render('dash', {
      posts,
      loggedIn: req.session.loggedIn
    });

  } catch (err){
     console.log(err);
     res.status(500).json(err);
  }
})

// deleting the post
router.delete('/post/:id', withAuth, (req, res) => {
  try {
    Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletePost => {
    if (!deletePost) {
      res.status(400).json();
      return;
    }
  })
} catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

// updating the post 
router.post('/updatepost/:id', withAuth, async (req, res) => {
  try {
    const postReturn = await Post.update(
      {content: req.body.comment_text}, 
      {
      where: {
        id: req.body.post_id
      }
    });

    if (!postReturn) {
      res
        .status(400)
        .json({ message: 'Post not found' });
      return;
    }
    postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'blogger',
        'post_date',
        'content']
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('dash', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;