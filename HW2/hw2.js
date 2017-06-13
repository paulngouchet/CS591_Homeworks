let express = require('express');
let router = express.Router();


let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cs591')     // I need more explanation and this thing works, i don't quite get it yet.

let Schema = mongoose.Schema

let stringSchema = new Schema({

  string: String,
  length: Number,
})

let string = mongoose.model('String', stringSchema)



let bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Handle the case where no string is passed in req.body.length == 0
router.post('/', function(req, res) {


    if((Object.keys(req.body).length == 0 )|| (req.body.string.length== 0) )
    {
      res.json({message: "Enter a string to check or save in the database"})
    }
    else{


    string.find( {string: req.body.string}, function(err, user){

      if(err) throw err

      if(!user.length){

        let text = req.body.string
        let lengthString = text.length

        let newString = new string({
          string: text,
          length: lengthString
        })

        newString.save()

          res.send("saved");


      }
      else{

        res.send(user)
      }
    })


}
});



router.get('/:name', function(req, res) {


    string.find( {string: req.params.name}, function(err, user){

      if(err) throw err

      if(!user.length){
        let text = req.params.name
        let lengthString = req.params.name.length

        let newString = new string({
          string: text,
          length: lengthString
        })

        newString.save()

        res.send("saved");
      }
      else{

        res.send(user)
      }
    } )


});

router.delete('/:name', function (req, res, next) {

  string.find( {string: req.params.name}, function(err, user){

    if(err) throw err

    if(!user.length){

    let empty = req.params.name
    res.json({message: "String with message " + empty + " is not in the database"});


    }
    else{

      let message = req.params.name

      string.remove({string: message}, function(err, response){
      if(err) res.json({message: "Error in deleting string " + message})
      else res.json({message: "String with message " + message + " removed."})
   } )

    }
  })



})

router.get('/', function(req, res, next) {

    string.find({}, function(err, users)
    {
      res.send(users)
    })
});



module.exports = router;
