const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const path = require('path')
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// server.js (or top of file where you use cors)
const allowedOrigins = ['https://jharringtondev.github.io', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like curl, mobile apps)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

//set up login
app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

if(process.env.NODE_ENV === "production"){
  // Only serve the client build if it exists. On some hosts (or during
  // intermediate deploys) the client may be deployed separately (e.g. to
  // GitHub Pages) and `client/build` won't exist on the server. Avoid
  // crashing with ENOENT by checking for the file first.
  const fs = require('fs');
  const clientIndex = path.join(__dirname, 'client', 'build', 'index.html');
  if (fs.existsSync(clientIndex)) {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
      res.sendFile(clientIndex);
    });
  } else {
    console.warn('Production mode but client/build/index.html not found — skipping static file serving.');
  }
} else {
  app.get('/', (req, res) => {
    res.send('API RUNNING')
  })
}