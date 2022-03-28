var   express = require('express')
const { check, validationResult } = require('express-validator');
var   router = express.Router()

const { signup , signin  , isSignedin } = require("../controllers/auth")



router.post('/signup'  ,[
    check("name").isLength({min : 3}).withMessage('Name is mandatory'),
    check('email').isEmail().withMessage('Email is required') ,
    check("password").isLength({min : 4}).withMessage('must be at  4 chars long'),
] , signup)



router.post('/signin'  ,[
    check('email').isEmail().withMessage('Email is required') ,
    check("password").isLength({min : 4}).withMessage('must be at  4 chars long'),
] , signin)




// router.get('/signout' ,signout)

router.get('/test' , isSignedin , (req ,res)=> {
    res.json({
        msg:"protected route"
    })
});



module.exports = router;