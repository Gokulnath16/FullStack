import express from 'express';
import { userDbSchema as User} from '../model/User.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

export default router.get('/user', async (req, res) => {

    const url = req.query;
    const token = url.key;
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU4MWEyNDEzZjgzNGNjYWFmODkyYzgiLCJpYXQiOjE2MDkzNTE5MTN9.RDgJ3ETzPRjlZwS7SckFdTeMQ9t0bie3rMYDIUteeXI';
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        //search for user using decoded 
            try{
              const user = await User.findOne({ _id: decoded._id });
              
              //Exclude Id and include other fields
              const allUsers = await User.find().select('name email -_id');
              res.send(allUsers);
              
            }catch(err){
              res.status(400).send('User not found');
            }

      } catch(err) {
          res.status(400);
      }

    
    


});