const pool = require("../db");
const bcrypt = require ("bcrypt");

const logIn = (req, res) => {
 const{email, password} = req.body;

 if (email == "vikas@gmail.com" && password == "0000"){
    return res.jason({
        status : "success"
    })
 } else {
    return res.status(401).jason({
        status: "failed"
    })
 }

}
 const register = async (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email ||  !password) {
    return res.status(400).json({
      success : false,
      message : "Name, email and password are required."
    });
   
  }
   const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
   
   if (existingUser.rows.length > 0){
      return res.status(409).json({
        success : false,
        message : "User already exist"
      })
   }
    const hashPassword = await bcrypt.hash(password,10); 

   try{
    await pool.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)", [name, email, hashPassword]);
    res.status(201).json({
      success : true,
      message : "New user created"
    });
   } catch (err) {
    console.error(err);
    res.send("Error ❌");
   }
   

  }
 

const insertLogs = async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO logs (url, status, response_time) VALUES ($1, $2, $3)",
      ["/test", "UP", 123]
    );

    res.send("Data inserted ✅");
  } catch (err) {
    console.error(err);
    res.send("Error ❌");
  }
}


module.exports = {
    logIn,
    insertLogs,
    register,
}