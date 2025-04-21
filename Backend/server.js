require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const toolRoutes = require('./routes/tools');
const userRoutes = require('./routes/users');
const PORT_1 = 3000;

app.use(cors());
app.use(express.json());

// Authentication middleware
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/users', userRoutes);


app.get("/", (req, res) => {
  res.send("Server is running.......");   
});
mongoose.connect("mongodb+srv://ahmedez570:7253416@cluster.bxlgmut.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err)); 
app.listen(PORT_1, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT_1}`);
});
