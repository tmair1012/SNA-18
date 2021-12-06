const router = require('express').Router();

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
.route('/thoughts')
.get(getAllThought)
.post(createThought)


// /api/thoughts/:thoughtId
router
.route('/thoughts/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/thoughts/:thoughtId/reactions')
.put(addReaction)
.put(removeReaction)

module.exports = router;