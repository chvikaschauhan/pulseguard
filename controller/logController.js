const pool = require("../db");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const getProfile = async (req, res) => {

  const userId = req.user.id;
   if(!userId) {
    return res.status(400).json({
      success : false,
        message : "UserID is empty"
    })
   }

  try {
    const userDetails = await pool.query("SELECT id, name,email FROM users WHERE id=$1", [userId]);

    if(userDetails.rows.length){
      return res.status(200).json(userDetails.rows);
    } else {
      return res.status(400).json({
        success : false,
        message : "User does not Exist"
      })
    }
  } catch (err) {
    console.error(err);
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });  
  }

}

const logIn = async (req, res) => {
 const{email, password} = req.body;

 if (!email ||  !password) {
    return res.status(400).json({
      success : false,
      message : "email and password are required."
    });
   
  }
    
  try {
      const userDetails = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (userDetails.rows.length == 0){
      return res.status(401).json({
        success : false,
        message : "Email or Password invalid"
      })
   }

    const compareValue = await bcrypt.compare(password, userDetails.rows[0].password);

    if (compareValue){
      const token = jwt.sign(
    {
        id: userDetails.rows[0].id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);
    return res.status(200).json({
      success : true,
      token : token
    })
   }
   if (!compareValue) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
}

   } catch (err) {
    console.error(err);
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
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
   try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (existingUser.rows.length > 0){
      return res.status(409).json({
        success : false,
        message : "User already exist"
      })
   }

   } catch (err) {
    console.error(err);
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
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
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
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
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
  }
}


module.exports = {
    logIn,
    insertLogs,
    register,
    getProfile
}