//import mongoose dependencies
const { Schema, model, Types } = require('mongoose');


//User document
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: true,
        // validate email using email regex
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//user virtual to count friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// declare use rmodel
const User = model('User', UserSchema);

// export user model
module.exports = User;