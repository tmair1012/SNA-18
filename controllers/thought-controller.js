// declare user and thought model
const { Thought, User } = require('../models');

const thoughtController = {
    //get All Thoughts
    getAllThought(req, res) {
    Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //grab a single thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        //populate thought with its reactions
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
    // create a new thought based on user ID
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id }},
                {new: true}
                )
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    //update a single thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
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
    //delete a thought by its id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId }) 
        .then((dbThought) => {
            if(!dbThought){
                res.status(404).json({ message: 'No Thought with this ID exists'});
                return;
            }
            return User.findOneAndUpdate(
                {id: params.userId},
                { $pull: {thoughts: params.thoughtId} },
                {new: true}
            );
        })
        .then((dbThoughtData) => res.json(dbThoughtData))
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
        .select('-__v')
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
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
            )
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought with this ID exists '});
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        }
};

//export thought routes
module.exports = thoughtController;