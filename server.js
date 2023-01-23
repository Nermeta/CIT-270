
const express = require ("express");
const app = express ();
const port = 3000;
const bodyParser = require ('body-parser');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello Wynter");
});

app.post('/login', (req, res) =>{
    const loginUser = req.body.userName;
    console.log('Login username: ' +loginUser);
    if (loginUser ="wgailey@byui.edu" && loginPassword =="1Toenermit!" ){
        const loginToken == uuidv4();
        res.send(loginToken);
    }
    else {
        res.status(401);
        res.send('Incorrect password for '+loginUser);
    }
});

app.listen(port,()=>{
    console.log("listening");
});
