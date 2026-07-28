const express = require("express");
const app = express();

require("dotenv").config();

const router = require('./routes/logRoutes')

app.use(express.json());
app.use("/api",router);

app.get("/", (req, res) => {
  res.send("PulseGuard Local Server Running 🚀");
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});