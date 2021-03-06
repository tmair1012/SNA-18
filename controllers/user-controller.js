//require user model
const { User } = require('../models')

const userController = {
    //Get all Users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    },

    //Create a new User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //Update a user with POST
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },

    //DELETE a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //add a friend to the user's friends list
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $push: { friends: params.friendsId}},
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User with this ID exists!' } );
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    //delete a friend :(
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            //pulling this data from the document
            { $pull: { friends:  params.friendsId }},
            //allow document to add newly updated user
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            console.log(dbUserData);
            if(!dbUserData) {
                res.status(404).json({ message: 'No User with this ID exists!' });
            }
            res.json(dbUserData)
        })

        .catch(err => res.status(400).json(err));
    }
    
};

//export routes
module.exports = userController;