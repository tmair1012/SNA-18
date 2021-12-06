const { Schema, model, Types } = require('mongoose');



const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String, max: 280,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter for date formating
        }
    }
)
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, min: 1, max: 280,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add Getter for date formatting
        },
        username: {
            // is this correct? Or do i need to reference the User Schema?
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})