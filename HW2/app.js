// grab the packages we need
let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let route = require('./hw2')

// routes will go here

app.use('/hw2', route)


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
