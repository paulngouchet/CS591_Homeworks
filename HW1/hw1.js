let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


router.post('/', function(req, res) {
let string = req.body.string
let length = string.length

let postObject = { "string" : string , "length": length }
    res.send(postObject);
});


// http://localhost:8080/api/users/chris
router.get('/:name', function(req, res) {
    // the user was found and is available in req.user
    let string = req.params.name
    let lengthString = req.params.name.length
    let jsonObject = { "string" : string , "length": lengthString }
    res.send(jsonObject);
});



router.get('/hw1', function(req, res, next) {
    res.send('Welcome to the page of the CS591 Homework1')
});



module.exports = router;
