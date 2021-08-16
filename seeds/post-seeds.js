const { Post } = require('../models');

const postData = [
    {
        title: "Final Fantasy XVI coming out soon!",
        post_content: "The awaited Final Fantasy XVI entry will be out on September 07, 2021",
        user_id: 4
    },
    {
        title: "Remake of Chrono Trigger",
        post_content: "Square-enix has decided to release a remake of Chrono trigger for PS5, more news will be release later this year",
        user_id: 4
    },
    {
        title: "Final Fantasy 7 Remake Part 2 news",
        post_content: "Square-enix has mentioned that the awaited Final fantasy 7 remake part 2, will be pushed back due to covid-related issues",
        user_id: 4

    }
]

// Export Files
const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;