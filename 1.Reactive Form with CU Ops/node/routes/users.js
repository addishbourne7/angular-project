var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =require('../database/database');
var  Users = require('../database/database')

/* GET users listing. */
router.get('/',async function(req, res, next) {
  return res.status(200).send({
    users: await db.Users.findAll()
  });
});

  router.post('/',async function(req, res, next){
    if(!req.body['firstName'] || !req.body['lastName']) {
      return res.status(400).send({
        message: "enter all fields"
      });
    }else {
    db.Users.create(req.body);
    return res.status(200).send({
      message: "user inserted succesfully",
      user: req.body
    });
  } 
      });


module.exports = router;
