require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { userSchema, passwordComplexityInstance } = require("../utils/validation");

const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
      const { error } = userSchema.validate(req.body);
  
      if (error) {
        return res.json({ error: error.details[0].message });
      }
  
      const { passwordValidationError } = passwordComplexityInstance.validate(
        req.body.password
      );
  
      if (passwordValidationError) {
        return res.json({ error: passwordValidationError.details[0].message });
      }
  
      const checkEmailQuery = "SELECT COUNT(*) as count FROM user WHERE mail = ?";
      db.query(checkEmailQuery, [req.body.email], (err, result) => {
        if (err) {
          console.error("Błąd podczas sprawdzania adresu e-mail w bazie danych:", err);
          return res.status(500).json({ error: "Błąd podczas rejestracji" });
        }
  
        const emailExists = result[0].count > 0;
        if (emailExists) {
          return res.json({ error: "Użytkownik o podanym adresie e-mail już istnieje." });
        } else {
          const sql = "INSERT INTO user (`name`, `surname`, `mail`, `password`) VALUES (?, ?, ?, ?)";
  
          bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
            if (err) {
              console.error("Błąd podczas haszowania hasła:", err);
              return res.json({ Error: "Error for hashing password" });
            }
            const values = [
              req.body.firstName,
              req.body.lastName,
              req.body.email,
              hash,
            ];
  
            db.query(sql, values, (err, result) => {
              if (err) {
                console.error("Błąd podczas wstawiania danych do bazy danych:", err);
                return res.json({ Error: "Inserting data error in server" });
              }
              return res.json({ Status: "Success" });
            });
          });
        }
      });
    } catch (error) {
      console.error("Błąd podczas rejestracji: " + error.message);
      return res.status(500).json({ error: "Błąd podczas rejestracji" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
});

module.exports = router;