const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    desc:{
        type: String,
        required: true,
        trim: true
    },
    day:{
        type: Date,
    },
    reminder:{
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})


const Task = mongoose.model('Task',taskSchema)



module.exports = Task