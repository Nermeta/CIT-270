const express = require ("express");
const app = express ();

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello Wynter");
});
app.listen(port,()=>{
    console.log("listening");
});