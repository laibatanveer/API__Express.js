const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            sparse:true
        },
        password: {
            type: String,
            required: true
        },
        ProfilePic: {
            type: String,
            default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        },
        role: {
            type: String,
            default: "user"
        },
        Joining: {
            type: Date,
            default: Date.now
        }

    }
)

const User = model('user', UserSchema)
module.exports = User