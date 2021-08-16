const { User } = require('../models');

const userData = [
    {
        username: "julio",
        github: "julioPlaceres",
        email: "jplv@gmail.com",
        password: "pasw123"
    },
    {
        username: "Squall",
        github: "squallLeon",
        email: "squalll@gmail.com",
        password: "pasw123"
    },
    {
        username: "Rinoa",
        github: "rinoaHeart",
        email: "rinoa21@gmail.com",
        password: "pasw123"
    },
    {
        username: "gameMaster",
        github: "gameMaster49",
        email: "mastergg@gmail.com",
        password: "pasw123"
    }
]

// Files exports
const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;