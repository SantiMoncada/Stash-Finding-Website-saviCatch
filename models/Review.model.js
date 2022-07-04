const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Owner is required"]
        },
        rating: {
            type: Number,
            min: 0,
            max: 5
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Review", reviewSchema);