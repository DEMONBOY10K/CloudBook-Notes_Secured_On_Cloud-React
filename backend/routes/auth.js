const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "we@reperfect!"

//Route 1: Create User using POST "api/auth/create-user" NO LOGIN REQUIRED
router.post('/create-user',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter valid Email').isEmail(),
    body('password','Password must have atleast 8 characters').isLength({min:8})
],async (req,res)=>{
    //If there are Errors , then returns BadRequest & Errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    // const user = User(req.body);
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({ errors: "User with this Email already exist , Try another Email"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt); 

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    // console.log(authToken);
    res.json({authToken}) //Using ES6 here, Can also write res.json(authtoken:authtoken)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
})

//Route 2: Authenticate User using POST "api/auth/login-user" NO LOGIN REQUIRED
router.post('/login-user',[
    body('email','Enter valid Email').isEmail(),
    body('password','Password cannot be empty').notEmpty()
],async (req,res)=>{
    //If Errors exists, returns BadRequest & Errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    
    try {
        let user = await User.findOne({email: email});
        let success=false ;
        if(!user){
            success = false;
            return res.status(400).json({success,error:"Enter correct credentials & Try again"});
        }
        
        const passCompare = await bcrypt.compare(password,user.password);
        if(!passCompare){
            success = false;
            return res.status(400).json({success,error:"Enter correct credentials & Try again"});
        }
        
        const data = {
            user:{
                id:user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({success,authToken}) //Using ES6 here, Can also write res.json(authtoken:authtoken)

    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
})

//Route 3: Get User Details using POST "api/auth/get-user" LOGIN REQUIRED
router.post('/fetch-user',fetchuser,async (req,res)=>{
    try {
        const userId= req.user.id // Earlier:- userId= req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error : Something Went Wromg!!")
    }
})


module.exports = router