const express = require('express')
const router = express.Router();
const User = require('../models/userSchema.js');
const errorHandler = require('../middlewares/errorHandler')
const jwt = require('jsonwebtoken');



router.post('/register',async (req,res)=>{
    let {email,password,first_name,last_name,phone} = req.body;
    try{
        password = password.toString(); 
       const data = new User({email,password,first_name,last_name,phone});

       const user = await data.save();
       if(user){
        const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');
        return res.status(201).send({token})
       }
      
       return res.status(400).send({message:'Invalid request'})
    }catch(error){
        if (error.code === 11000) {
            res.status(400).send({ message: 'Email already exists.' });
        } else {
            errorHandler(error, res);
        }
      
    }
})

router.post('/login',async (req,res)=>{
    let {email,password} = req.body;
    console.log(email)
    console.log(password)
    try{
       const user = await User.findOne({email});

       console.log(user)
       if (!user) {
        return res.status(400).send({ message: 'Invalid email or password' });
      }
      if (!(await user.checkPassword(password))) {
        return res.status(400).send({ message: 'Invalid password' });
      }
      const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');
      return res.status(201).send({token})
      
    }catch(error){
        console.log(error)
        errorHandler(error,res)
      
    }
})

module.exports = router