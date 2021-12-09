const router = require('express').Router();

// call all functions for routes
const{
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.get(getAllThought)
.post(createThought)


// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.put(addReaction)

// /api/thoughts///<thoughtId>/<replyId>
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

// export thought routes
module.exports = router;