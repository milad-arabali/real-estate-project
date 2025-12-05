import {model, models, Schema} from "mongoose";


const usersSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    family: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

const User = models.User || model('User-estate', usersSchema);
export default User;
