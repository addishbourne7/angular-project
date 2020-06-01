var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =require('../database/database');
var  Users = require('../database/database')
const passport =require('passport');
const jwt = require('jsonwebtoken');
// auth with google
router.get('/google',passport.authenticate('google',{
  // handel with passport
  scope:['profile'] 
  
}))

 return res.status(200).send({
    users: await db.Users.findAll()
  });
});
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.send('you have reached to the callBAck');
}) ;/* GET users listing. */
router.get('/',async function(req, res, next) {
 

  router.post('/signup',async function(req, res, next){
    if(!req.body['name'] || !req.body['email'] || !req.body['password']) {
      return res.status(400).send({
        message: "enter all fields"
      });
    }else {
    db.Users.findOne({where:{email:req.body.email}}).then((currentUser) =>{
      if(currentUser){
     //already have the user
     return res.status(400).send({
       message: "Email has already been taken",
     })
      }else{
        db.Users.create(req.body);
        let payload ={ subject : db.Users.id }
        let token = jwt.sign(payload, 'secretKey')
    return res.status(200).send({token});
      }
    }) 
    
  } 


     });
     router.post('/signin',async function(req, res, next){
      if(!req.body['email'] || !req.body['password']) {
        return res.status(400).send({
          message: "enter all fields"
        });
      }else {
        db.Users.findOne({where:{email:req.body.email,password:req.body.password}}).then((currentUser) =>{
          if(currentUser){
            let payload ={ subject:currentUser.id }
            let token =jwt.sign(payload, 'secretKey')
            return res.status(200).send({token})
          }else{
            return res.status(400).send({
              message:"Please check your Email & password",
            })
          }
        })
      }
    })


module.exports = router;
