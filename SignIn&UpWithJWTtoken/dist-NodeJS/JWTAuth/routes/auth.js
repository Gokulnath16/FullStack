import express from 'express';
import { userDbSchema as User} from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



//validation import 
import { registerValid, loginValid } from '../routes/validation.js';

const router = express.Router();





export default router.post('/register', async (req, res) => {

    //Evaluvate data before create user //old code=> Joi.validate(req.body, schema);    
    const { error } = registerValid(req.body);
    if(error) return  res.status(400).send(error.details[0].message);


    //check if email already exist in db
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already Exist');


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send({ user: user._id });
    }catch(err){
        res.statusCode(400).send(err);
    }

});


router.get('/register', (req, res) => {
    res.send('post');
})


//LOGIN 
router.get('/login', (req, res) => {
    res.send('login');
})




router.post('/login', async (req, res) => {

    //Evaluvate data before create user //old code=> Joi.validate(req.body, schema);    
    const { error } = loginValid(req.body);
    if(error) return  res.status(400).send(error.details[0].message);

        //check if email exist in db
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(400).send('Email not found');

        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid Password'); 
        
        //Create and assign token 
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        //res.header('auth-token', token).send(token); //Use JWT website to decrypt token
        res.status(200).send({ auth: true, authToken: token });

});




