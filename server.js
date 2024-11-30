const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Ema@4374',
    database: 'hotel'
})

db.connect(err =>{
    if (err) {
        throw err
    }
    console.log('Database is connected.');
})

app.get('/api/users',(req, res) =>{
    db.query('SELECT * FROM users', (err,result)=> {
        if(err) {
            throw err
        }
        console.log(result);
        res.json(result);
    })
})

app.post('/api/users' , (req, res) =>{
    const user = req.body;
    db.query('INSERT INTO users SET ?' , user ,(err) =>{
     if(err) throw err;
     res.sendStatus(201);
    }) 
 })
 
 app.delete('/api/users/:id', (req, res)=>{
     db.query('DELETE FROM users WHERE id = ?' , [req.params.id] , (err) =>{
         if(err) throw err;
         res.sendStatus(201);
     })
 })
 
 app.get('/api/users/:id' , (req , res) =>{
     db.query('SELECT * FROM users  WHERE id = ?', [req.params.id] ,(err , result) =>{
         if(err) throw err ;
         res.json(result[0]);
     });
 })
 
 
 app.put('/api/users/:id' , (req , res) =>{
     const {id} = req.params;
     const updatedUser = req.body ;
     db.query('UPDATE users SET ? WHERE id = ? ' , [updatedUser , id] , (err)=>{
         if(err) throw err;
         res.sendStatus(201);
     })
 })
 

app.listen(port, ()=> console.log(`Server is running at ${port}`)
)
