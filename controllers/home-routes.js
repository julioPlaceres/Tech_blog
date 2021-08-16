// Require Files
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get all Posts
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'github']
        }
      ]
    })
    const posts = data.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  }
  catch (err) { res.status(500).json(err); }
});

// Re-direct user to sign up
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// Re-direct user to login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Get post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const data = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'github']
        }
      ]
    });

    // Return if no data is found
    if (!data) { res.status(404).json({ message: 'No post found under this id' }); return; }
    const post = data.get({ plain: true });
    //Render Post
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  }
  catch (err) { res.status(500).json(err); }
});

module.exports = router;