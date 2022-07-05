const { Schema, model } = require("mongoose");

const mapSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Map name is required"],
            unique: [true, "Map name must be unique"]
        },
        description: {
            type: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "owner is required"]
        },
        type: {
            type: String,
            enum: ['VIRTUAL', 'PHYSICAL']
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review',
            timestamp: Date.now()
        }],
        stashes: [{
            type: Schema.Types.ObjectId,
            ref: 'Stash',
            timestamp: Date.now()
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Map", mapSchema);