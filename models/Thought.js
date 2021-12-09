// declare mongoose dependencies
const { Schema, model, Types } = require("mongoose");
// implement mongoose for time variable
const moment = require("moment");

// create subdocument reactionSchema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    max: 280,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: () => moment().format("YYYY-MM-DD HH:mm"),
  },
});
//main document for thought
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      min: 1,
      max: 280,
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
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// implement virtuals for reaction count
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//declare the thought model
const Thoughts = model("Thought", ThoughtSchema);

//export the thought model
module.exports = Thoughts;
