const { Comment } = require('../models/Comment');

const commentData = [
    {
        "id": 1,
        "name": "Reagin",
        "comment": "Hey everybody",
        "post_id": 2
    },
    {
        "id": 1,
        "name": "Ridge",
        "comment": "wow, so cool",
        "post_id": 1
    },
    {
        "id": 1,
        "name": "Jacob",
        "comment": "OMG",
        "post_id": 2
    },
    {
        "id": 1,
        "name": "Bob",
        "comment": "sup",
        "post_id": 3
    },
    {
        "id": 1,
        "name": "Bill",
        "comment": "....",
        "post_id": 1
    },
    {
        "id": 1,
        "name": "Jacob",
        "comment": "no way",
        "post_id": 3
    },
]

const seedComment= () => Comment.bulkCreate(commentData);

module.exports = seedComment;