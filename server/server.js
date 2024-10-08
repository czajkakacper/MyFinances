const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});

// npm install bcrypt dotenv express cors path cookie-parser mysql jsonwebtoken