require('dotenv').config();  
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3001;
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const {sequelize} = require('./models');
const chat = require('./chatcord/server.js')
//const { SequelizeScopeError } = require('sequelize/types');

const cors = require('cors');
const router = require('./routes/index')
const session = require('express-session');

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(express.static('public'));

app.use(cors());

app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
    cookie:{
        hasonly:true,
        secure:false
    }
}))





// app.use('/',(req,res)=>{
//     res.render('./index.html');
// })
/*app.use('/',(req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



sequelize.sync({force:false})
.then(()=>{
    console.log('succ');
})
.catch((err)=>{
    console.log(err);
})




chat;
app.use('/',router);


app.listen(port, ()=>{
    console.log('it works!',port);
})