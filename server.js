
const express = require ("express");
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');
const redis = require('redis');
const redisClient = redis.createClient({url:"redis://127.0.0.1:6379"});
const {v4: uuidv4} = require('uuid');


app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello Wynter");
});

app.post('/login', (req, res) =>{
    const loginUser = req.body.userName;
    console.log('Login username: ' +loginUser);
    if (loginUser ="wgailey@byui.edu" && loginPassword =="1Toenermit!" ){
        const loginToken = uuidv4();
        res.send(loginToken);
    }
    else {
        res.status(401);
        res.send('Incorrect password for '+loginUser);
    }
});

app.listen(port,()=>{
    redisClient.connect();
    console.log("listening");
});
