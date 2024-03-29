const express = require('express');
const path = require('path');
let dbJson = require("./db/db.json")
const fs = require("fs")


const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public')); // static assets ie front end files

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get route with response in json
app.get("/api/notes", (req, res) =>{
  res.json(dbJson)
})

// post route with both request and response
app.post("/api/notes", (req, res) =>{
// this is the request
 let newNote = {
 title: req.body.title,
 text: req.body.text,
 id: Math.random()
 }

 dbJson.push(newNote)

 fs.writeFileSync("./db/db.json", JSON.stringify(dbJson))

// this is the response
res.json(dbJson)
})


//base url: http://localhost:3001/
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);