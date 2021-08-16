// Require Files
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', async (req, res) => {
  try {
    const data = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// get User by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    });
    if (!data) { res.status(404).json({ message: 'No user found under this id' }); return; }
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Create Users
router.post('/', async (req, res) => {
  // Create user
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github: req.body.github
  })
    .then(data => {
      // Save session
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.github = data.github;
        req.session.loggedIn = true;

        // Send back response
        res.json(data);
      });
    });
});

// login user
router.post('/login', async (req, res) => {
  // Find the user email
  const data = await User.findOne({ where: { email: req.body.email } });

  // If no email found return error
  if (!data) { res.status(400).json({ message: 'No user found under that email address' }); return; }

  // Check Password
  const validPassword = data.checkPassword(req.body.password);

  // If password not valid return error
  if (!validPassword) { res.status(400).json({ message: 'Incorrect password!' }); return; }

  req.session.save(() => {
    // declare session variables
    req.session.user_id = data.id;
    req.session.username = data.username;
    req.session.github = data.github;
    req.session.loggedIn = true;

    res.json({ user: data, message: 'You are now logged in!' });
  });
});

// Logout user
router.post('/logout', (req, res) => {
  // If user is logging, destroy session
  if (req.session.loggedIn) {
    req.session.destroy(() => { res.status(204).end(); });
  }
  else { res.status(404).end(); }
});

// Update User by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const data = await User.update(req.body, {
      individualHooks: true,
      where: { id: req.params.id }
    });

    if (!data[0]) { res.status(404).json({ message: 'No user found under this id' }); return; }
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

// Delete user by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });
    if (!data) { res.status(404).json({ message: 'No user found with this id' }); return; }
    res.status(200).json(data);
  }
  catch (err) { res.status(500).json(err); }
});

module.exports = router;