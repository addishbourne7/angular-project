
const passport =require('passport');
const GoogleStrategy =require('passport-google-oauth20');
const keys= require('./key');
var Users =require('../database/database');
var bodyParser = require('body-parser');
var db =require('../database/database');



passport.use(
    new GoogleStrategy({
        //option for the google start 
        callbackURL:'/users/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
    // passport call back
    db.Users.findOne({where:{email:profile.id}}).then((currentUser)=>{
        if(currentUser){
         done(null);
        }else{
            new db.Users({
                name:profile.displayName,
                email:profile.id,
                password:profile.name.familyName
            }).save().then((newUsers)=>{
                console.log('saved', newUsers);
                 done(null);
                console.log('data-inserted');
            })
        }
    })
    })
)