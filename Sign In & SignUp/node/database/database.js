const Sequelize = require('sequelize');


const sequelize = new Sequelize('goodname', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const  Users = sequelize.define('abjayons',{
   id:{
     type: Sequelize.INTEGER,
     primaryKey: true

   } ,
  name: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
  email: {
        type: Sequelize.STRING,
        allowNull: false
      },
  password:{
      type:Sequelize.STRING,
      allowNull: false
  } 
},{
    timestamps: false
});
const  Index = sequelize.define('list',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true

     },firstName: {
       type: Sequelize.STRING,
       allowNull: false,  
     },lastName: {
       type: Sequelize.STRING,
       allowNull: false
     },dateOfBirth: {
       type: Sequelize.DATE,
       allowNull: false
     }
   
},{
   timestamps: false
});



module.exports = { connection:function(){
    sequelize
    .authenticate()
    .then(() =>{
        console.log('connection has been stablished');
    })
    .catch(err =>{
        console.log('unable to connect to the data base:' ,err);
    });
},
Users,
Index
};