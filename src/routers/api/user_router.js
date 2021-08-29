const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../../models/user')
const{ sendWelcomeEmail, sendCancelEmail } = require('../../emails/accounts')
const auth = require('../../middleware/auth')



const router = new express.Router()
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        cb(undefined,true)
    }
})

router.get('/', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

router.post('/signup' , async (req, res) => {
    
    try {
        const user = new User(req.body)
        // await sendWelcomeEmail(user.email, user.name)
        // const token = await user.generateAuthToken()
        res.status(201).send({user})
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/login', async (req, res) => {
    
    if(!req.body.email || !req.body.password) {
        res.status(400).send('Please provide an email and password')
    }

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
        
    }catch(e){
        console.log()
        res.status(400).send(e.message)
    }
})

router.post('/logout', auth , async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/logoutAll', auth , async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.get('/me',auth, async (req, res) => {
    res.send(req.user)
})
// ? ':id' is called "route parameters"

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) // ? Update fields sent from the client.
    const allowedUpdates = ['name', 'email', 'password', 'age'] // ? List of allowed updates.
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // ? Check for each update sent by user if is contained in the allowed updates.

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        const user = req.user // ? find
        updates.forEach((update) => user[update] = req.body[update]) // ? update
        await user.save() // ? save
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/me',auth, async (req, res) => {
    try {
        await req.user.remove()
        await sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/:id/avatar', async (req,res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

router.post('/me/avatar', auth, upload.single('avatar'), async (req,res) =>{
    const buffer = await sharp(req.file.buffer).resize(({ width: 250, height: 250})).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({error: error.message})
})

router.delete('/me/avatar',auth, async (req,res) => {
    if(req.user.avatar){
        req.user.avatar = undefined
         await req.user.save()
    }
    res.send()
})




module.exports = router
