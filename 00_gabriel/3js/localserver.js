
//(2018 - update February 15) Config.js
//(2018 - updated February 14) Adding Database
//(2018 - updated February 13) Recreating the Express server exercise from DWD Servers class, but this time for localhosting. I'm comparing the originalr "server.js" with the "myapp/app.js" express file.


var express = require ('express');
var bodyParser = require ('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});

var path = require ('path')
var app = express();



app.listen(8080, function(){
  console.log('Local host server on port 8080...')
})



app.use(urlencodedParser);

//activating TEMPLATE in "/views/template.ejs"
app.set('view engine', 'ejs');

//Allows for Express to access the static files (CSS, Images, etc) inside ""/public". Otherwise the .EJS file can't access CSS like a ".HTML" can.//
app.use(express.static(__dirname + '/public'));

//(OPTION 01)this uses the templates as the response to a request get/post//
//"person.name" and "person.other" are referencing the "template.ejs" file
// app.get('/templatetest', function (req, res){
//    var data= {person: {name: "Shawn", other: "blah"}};
//    res.render('template.ejs', data);
// });



//(OPTION 02) Array of DATA//
// app.get('/templatetest', function (req, res){
//    var data= {people: [{name: "Shawn", other: "blah"}, {name: "Juca", other: "No"}, {name: "Pedro", other: "Nope"}]};
//    res.render('template.ejs', data);
// });

//(OPTION 02-B test) Array of DATA//
app.get('/templatetest', function (req, res){
   var data= {people: [{name: "textfield", other: "blah"}, {name: "textfield02", other: "No"}, {name: "Pedro", other: "Nope"}]};
   res.render('template.ejs', data);

});

//"post" request
app.post('/processit', function(req, res) {
    var textvalue = req.body.textfield;
    var textvalue02 = req.body.textfield02;
    res.send("What make you think you are going to achieve " + textvalue +" ?!!"+ "And how dare you say " + textvalue02 +"? Not COOL!");

  });


//simple request//
// app.get('/somethingelse', function(req, res){
//   res.send('Fala aê mundo!')
// })
