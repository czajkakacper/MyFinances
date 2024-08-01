require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { userSchema, passwordComplexityInstance } = require("./validation");

const saltRounds = 10;

router.post("/login", async (req, res) => {
    const sql = "SELECT * FROM user WHERE mail = ?";
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
});