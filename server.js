
const express = require ("express");
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');
const redis = require('redis');
const redisClient = redis.createClient({url:"redis://127.0.0.1:6379"});
const {v4: uuidv4} = require('uuid');
const https = require('https');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.static('public'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.json());

app.use(async function(req, res, next){
    var cookie = req.cookies.stedicookie;
    if(cookie === undefined && !req.url.includes("login") && !req.url.includes("html") && !req.url.includes("js")
    && !req.url.includes("css") && !req.url.includes("ico") && !req.url.includes("png") && req.url !== "/") {
        res.status(401);
        res.send("No Cookies for you");
    }
    else{
        res.status(200);
        next();
    }
});

app.post('/rapidsteptest', async (req, res) =>{
    const steps = req.body;
    await redisClient.zAdd('Steps',[{score:0,value:JSON.stringify(steps)}]);
    console.log("Steps", steps);
    res.send('saved');
})

app.get("/", (req, res) => {
    res.send("Hello Wynter");
});

app.get("/validate", async (req, res) =>{
    const loginToken = req.cookies.stedicookie;
    console.log("loginToken", loginToken);
    const loginUser = await redisClient.hGet("TokenMap",loginToken);
    res.send(loginUser);
}
)


app.post('/login', async (req, res) =>{
    const loginUser = req.body.userName;
    const loginPassword = req.body.password;
    console.log('Login username: ' +loginUser);
    const correctPassword = await redisClient.hGet('UserMap', loginUser);

    if (correctPassword==loginPassword){
        const loginToken = uuidv4();
        await redisClient.hSet('TokenMap',loginToken,loginUser);
        res.cookie('stedicookie', loginToken);
        res.send(loginToken);
    }
    else {
        res.status(401);
        res.send('Incorrect password for '+loginUser);
    }
});

// app.listen(port,()=>{
//     redisClient.connect();
//     console.log("listening");
// });

https.createServer(
    {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.cert'),
        ca: fs.readFileSync('./chain.pem')

    },
    app
).listen(port,() =>{
    redisClient.connect();
    console.log('Listening on port: ' + port);
})