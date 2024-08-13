require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { userSchema, passwordComplexityInstance } = require("./validation");

const saltRounds = 10;

// Rejestracja
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
            //console.log("Hasło po hashowaniu:", hash);  // haslo po hashowaniu
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

// Logowanie
router.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE mail = ?";
  db.query(sql, [req.body.email], (err, data) => {
    const haslo = data[0].password;
    console.log("Hasełko:", haslo);
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        const haslo1 = data[0].password;
        console.log("Hasełko:", haslo1);
          if (err) {
              console.error("Błąd podczas porównywania haseł:", err);
              return res.status(500).json({ Error: "Login error in server" });
          }
    
          if (response) {
            const mail = data[0].mail;
            const token = jwt.sign({ mail }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" }); // jwt-secret-key -> .env -> 32/256 znakow
            res.cookie("token", token);
  
          } else {
            return res.json({ Error: "InvalidPassword" });
          }
        });
      } else {
        return res.json({ Error: "No email existed" });
      }
    });
  });

// Weryfikowanie użytkownika
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not ok" });
      } else {
        req.mail = decoded.mail;
      }
    });
  }
};

router.get("/main", verifyUser, (req, res) => {
});

// Wylogowanie
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
});

module.exports = router;