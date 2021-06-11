const express = require('express')
const router = express.Router()
const User = require('../models/usermodel')
const {validateData} = require('../lib/utils')

router.get('/allData', async (req, res) => {
    try{
        const userData = await User.find()
        res.send({success: true, data: userData})
    }
    catch(err){
        res.send({success: false, msg: {general: "Error retrieving data from database"}})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const userData = await User.find({_id: req.params.id})
        res.send({success: true, data: userData})
    }
    catch(err){
        res.send({success: false, msg: {general: "Error connecting with database"}})
    }
})

router.post('/addEntry', validateData, async (req, res) => {
    const {name, number} = req.body
    const phoneNumber = parseInt(number)
    try{
        const userData = new User({
            name: name,
            number: phoneNumber
        })
        const user = userData.save()
        res.send({success: true, data: user})
    }
    catch(err){
        res.send({success: false, msg: {general: 'Error saving to database'}})
    }
})

router.put('/:id', validateData, async (req, res) => {
    const {name, number} = req.body;
        const phoneNumber = parseInt(number)
        console.log(req.params)
        
    try{
        const userData = await User.findOneAndUpdate({_id: req.params.id}, {name: name, number: phoneNumber})
        res.send({success: true, data: userData})
    }
    catch(err){
        res.send({success: false, msg: {general: "There was an error updating the database"}})
    }
})

module.exports = router