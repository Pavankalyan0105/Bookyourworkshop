const express = require('express')

const router = express.Router()


const { getUserById , getUser , updateUser} = require('../controllers/user')
const { isSignedin , isAuthenticated ,isAdmin } = require('../controllers/auth')


router.param("userId" , getUserById);

router.get("/user/:userId" ,  isSignedin , isAuthenticated , getUser);

router.put("/:userId"  , isSignedin , isAuthenticated , updateUser);

 

module.exports = router;