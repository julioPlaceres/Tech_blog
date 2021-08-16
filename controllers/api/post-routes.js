// Require Files 
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      attributes: ['id', 'title', 'created_at', 'post_content'],
      order: [['created_at', 'DESC']],
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
        },
      ]
    });
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Get User by ID
router.get('/:id', async (req, res) => {
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
          model: User,
          attributes: ['username', 'github']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'github']
          }
        }
      ]
    });

    if (!data) { res.status(404).json({ message: 'Post not found by the selected ID' }); return; }
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Create a Post
router.post('/', withAuth, async (req, res) => {
  try {
    const data = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    });
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Update Post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.update({
      title: req.body.title,
      post_content: req.body.post_content
    },
      {
        where: {
          id: req.params.id
        }
      });
    if (!data) { res.status(404).json({ message: 'No Post found under this ID' }); return; }
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Delete Post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.destroy({ where: { id: req.params.id } });

    if (!data) { res.status(404).json({ message: 'No post found under this id' }); return; }
    res.json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Export instance of router
module.exports = router;