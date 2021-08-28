const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 7,
        trim: true,
        validate(value){
            if(value.includes('password'))
                throw new Error('Password cant contain the word \'password\'')
              
        }
    },
    email:{
        type : String,
        required: [true,'Please enter a valid email address'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please provide a valid email address')
            }
        }
    },
    tokens: [{ 
        token: {
            type: String,
            required: true //? if an object is added to this array it must be token
        }
    }],
    avatar:{
        type: Buffer
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{
    timestamps: true
})
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token =  jwt.sign({_id:user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })

    user.tokens = user.tokens.concat({ token })
    await user.save()


    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next){
    const user = this // ? --this-- refers to the "user document" (including all the fields)

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})


const User = mongoose.model('User',userSchema)

module.exports = User