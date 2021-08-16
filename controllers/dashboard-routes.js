// Requiere Files
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Find all Posts
router.get('/', withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        user_id: req.session.user_id
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
    const posts = data.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  }
  catch (err) { res.status(500).json(err); }
});

// Get post by ID
router.get('/edit/:id', withAuth, async (req, res) => {
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
    })
    if (!data) { res.status(404).json({ message: 'No post found under this id' }); return; }

    const post = data.get({ plain: true });

    res.render('edit-post', { post, loggedIn: true });
  }
  catch (err) { res.status(500).json(data); }
});

// Create a Post
router.get('/create/', withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      where: {
        user_id: req.session.user_id
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
    const posts = data.map(post => post.get({ plain: true }));
    res.render('create-post', { posts, loggedIn: true });
  }
  catch (err) { res.status(500).json(err); }
});

// Export instance of router
module.exports = router;