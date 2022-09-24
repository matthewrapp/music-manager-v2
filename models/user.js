import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        password: {
            type: String,
            required: true
        },
        tier: {
            type: String,
            enum : ['free', 'basic', 'pro'],
            default: 'free',
            required: true
        }
    }, {
        timestamps: true
    }
);

// check for User modal already, if not create a User modal
module.exports = models.User || model('User', UserSchema, "users");