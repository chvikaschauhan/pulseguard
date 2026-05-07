const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PulseGuard Local Server Running 🚀");
});

//LoginAPI
app.post("/login", (req, res) => {
 const{email, password} = req.body;

 if (email == "vikas@gmail.com" && password == "0000"){
    return res.jason({
        status : "success"
    })
 } else {
    return res.status(401).json({
        status: "failed"
    })
 }


  
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});