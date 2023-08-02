const express = require('express')
const router = express.Router()

const { Login, Signup, deleteUser, updateProfile, userByID, getAllUsers } = require('./Controller')


router.post('/login', Login)
router.post('/signUp', Signup)
router.get('/getAllUsers', getAllUsers)
router.get('/getuserByID', userByID)
router.delete('/deleteUser', deleteUser)
router.put('/updateProfile', updateProfile)




module.exports = router