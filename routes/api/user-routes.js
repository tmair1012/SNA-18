const router = require('express').Router();

const{
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

// api/user
router
.route('/')
.get(getAllUser)
.post(createUser)

// api/user/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)
.put(addFriend)

module.exports = router