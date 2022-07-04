const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "username must be unique"],
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"]
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    description: {
      type: String,
      default: 'No description provided.'
    },
    role: {
      type: String,
      enum: ['USER', 'CREATOR', 'ADMIN'],
      default: 'USER'
    },
    points: {
      type: Number,
      min: 0
    },
    stashes: [{
      type: Schema.Types.ObjectId,
      ref: 'Stash',
      timestamp: Date.now()
    }]
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)