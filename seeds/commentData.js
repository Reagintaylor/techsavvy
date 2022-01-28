const { Comment } = require('../models/Comment');

const commentData = [
    {
        "id": 1,
        "name": "Sal",
        "comment": "Hey everybody",
        "post_id": 2
    },
    {
        "id": 1,
        "name": "Lernantino",
        "comment": "wow, so cool",
        "post_id": 1
    },
    {
        "id": 1,
        "name": "Jordan",
        "comment": "OMG",
        "post_id": 2
    },
    {
        "id": 1,
        "name": "Amiko",
        "comment": "sup",
        "post_id": 3
    },
    {
        "id": 1,
        "name": "Blake",
        "comment": "....",
        "post_id": 1
    },
    {
        "id": 1,
        "name": "Jordan",
        "comment": "no way",
        "post_id": 3
    },
]

const seedComment= () => Comment.bulkCreate(commentData);

module.exports = seedComment;