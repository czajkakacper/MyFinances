const express = require("express");
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });