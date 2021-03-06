"use strict";

const passportLocalMongoose = require("passport-local-mongoose");
const Member = require("./memberSchema");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
            unique: true,
        },
        level: {
            type: String,
            require: true,
        },
        valid: {
            type: String,
            required: true,
            default: "01", // means: use
        },
        member: {
            type: Schema.Types.ObjectId,
            ref: "Member",
        },
        updatedId: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
        },
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    },
    {
        collection: "admins",
    }
);

adminSchema.plugin(passportLocalMongoose, {
    usernameField: "contact",
});

module.exports = mongoose.model("Admin", adminSchema);
