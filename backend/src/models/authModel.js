//ejemplo del profe
import mongoose from 'mongoose'
const esquema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps:true
    })
export default mongoose.model('users',esquema)
