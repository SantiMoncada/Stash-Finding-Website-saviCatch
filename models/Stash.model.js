const { Schema, model } = require("mongoose");

const stashSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String
        },
        hints: {
            type: [String]
        },
        value: {
            type: Number,
            min: 0,
            required: [true, "stash must hava a value"]
        },
        type: {
            type: String,
            enum: ['VIRTUAL', 'PHYSICAL']
        },
        password: {
            type: String,
            required: [true, "Password for stash is required"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Stash", stashSchema);