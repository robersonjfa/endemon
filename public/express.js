const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type: application/json
// app.use(bodyParser.json());
// // parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Bem-vindo ao servidor!" });
// });

// app.get("/login", (req, res) => {
//     res.json(true);
//     console.log(req);
// });

// // set port, listen for requests
// app.listen(80, () => {
//     console.log("Servidor rodando na porta 3000.");
// });
