const { Post } = require('../models/Post');

const postData = [
    {
        "id": 1,
        "title": "First Day",
        "author": "Lernantino",
        "post": "Today was my first day in kindergarten...",
        "user_id": 2
    },
    {
        "id": 2,
        "title": "I Love Chipotle",
        "author": "Blake",
        "post": "Chipotle is sooo good...",
        "user_id": 5
    },
    {
        "id": 3,
        "title": "Life is great",
        "author": "Amiko",
        "post": "I'm so grateful for...",
        "user_id": 2
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;