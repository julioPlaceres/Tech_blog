const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_text: "I like it!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Can't wait for it!"
    },
    {
        user_id: 3,
        post_id: 1,
        comment_text: "Let's hope we get more news soon"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "I loved the previous one, let's hope this is good"
    },
    {
        user_id: 1,
        post_id: 2,
        comment_text: "When is it coming out?"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "next year!"
    },
    {
        user_id: 3,
        post_id: 3,
        comment_text: "wait seriously"
    },
    {
        user_id: 1,
        post_id: 3,
        comment_text: "nooooo!"
    }
]

// Exporting Files
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;