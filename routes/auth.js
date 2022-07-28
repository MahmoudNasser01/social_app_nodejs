const router = require('express').Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');


/**
 *@swagger
 * /register:
 *  post:
 *   parameters:
 *
 *
 *
 */
// register
router.post('/register', async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;
        const newUser = await new UserModel(req.body);
        const user = await newUser.save();
        res.status(201).json(user);

    }catch (err){
        console.log(err)
    }
    res.send('ok');
});


// login router

router.post('/login', async (req, res)=>{
    try{
        const user = await UserModel.findOne({email: req.body.email});
        console.log(user)
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('wrong password');

        res.status(200).json('loged in')

    }catch (e) {
        res.status(500).json(`server error: ${e}`);
    }

})

module.exports = router