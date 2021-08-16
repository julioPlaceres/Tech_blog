// Require Files
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const data = await Comment.findAll({});
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    if (req.session) {
      const data = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      });
      res.status(200).json(data);
    }
  }
  catch (err) { res.status(500).json(err); }
});

router.delete('/:id', withAuth, async (req, res) => {
  try{
  // Get the data by the ID
  const data = await Comment.destroy({ where: { id: req.params.id } });
  console.log(data);

  // Check if data is returned
  if (!data) { res.status(404).json({ message: 'Comment not found under this id' }); return; }

  // Return data
  res.status(200).json(data);
  }
  catch(err) { res.status(500).json(err); }
});

//Exporting File
module.exports = router;