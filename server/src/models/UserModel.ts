import { Schema, model } from 'mongoose';
import { FullUser } from '../../../shared/User';
import statsSchema from './StatsSchema';

const userSchema = new Schema<FullUser>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    nameL: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    registeredAt: {
        type: Number,
        required: true,
    },
    lastLoggedIn: {
        type: Number,
        required: true,
    },
    stats: {
        type: statsSchema,
        required: true,
    },
    previousNames: {
        type: [String],
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
});

const userModel = model('users_v0', userSchema);

export default userModel;
