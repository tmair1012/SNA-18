const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                {new: true}
                )
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
             body, 
             { new: true, runValidators: true}
             )
             .populate({
                path: 'reactions',
                select: '-__v'
            })
             .then(dbThoughtData => {
                 if(!dbThoughtData){
                     res.status(404).json({ message: 'No Thought with this ID exists' });
                     return;
                 }
                 res.json(dbPizzaData)
             })
             .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true}
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with this ID exists '});
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { reactionId: params.reactionId } } },
            { new: true }
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;