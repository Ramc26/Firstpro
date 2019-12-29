var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Register') /*creating students db in Mongodb (Default port no for mongodb is 27017)*/
var collection = db.get('Signup')/*creating collection roll_number in db*/
var db_1 = monk('localhost:27017/Signup')
var collection_1 = db_1.get('client_details')
router.get('/', function(req, res, next) {
  res.render('register');
});
router.post('/form',function(req,res){
	res.redirect('/')
	console.log(req.body.fname);
	console.log(req.body.lname);
	console.log(req.body.mail);
	console.log(req.body.pass);
	collection.insert({"First_name":req.body.fname,"Last_name":req.body.lname,"Email":req.body.mail,"Password":req.body.pass}
		, function(err,docs){
			if (err){
				console.log(err)
			}
			else{
				console.log(docs)
			}
		});
});
router.post('/login', function(req, res){
	var uname=req.body.mail;
	var pwd = req.body.pass;
	collection.findOne({"Email":uname,"Password":pwd}, function(err, docs){
		if(!docs) {
			console.log("invalid")
			res.render('register',{error:"invalid credintials"});
		}
		else if(docs){
			res.render('index');
		}
		else{
			console.log(err);
		}
	});
});
/******* TO SEND DATA FROM FRONTEND TO DATABASE IN REGISTRATION FORM AFTER LOGIN ********/
/**router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});**/
router.post('/register',function(req,res){
	res.redirect('/')
	collection_1.insert({"Name":req.body.fname,"Roll_number":req.body.lname,"DOB":req.body.dob,"Branch":req.body.branch,
		"College":req.body.clg,"Email":req.body.mail,"Mobile_Number":req.body.mobile,"Age":req.body.age}
		, function(err,docs){
			if (err){
				console.log(err)
			}
			else{
				console.log(docs)
			}
		})
});
/******* TO GET DATA FROM DATABASE TO FRONTEND(IN TABLE FORMAT)********/
router.get('/details', function(req,res){
	collection_1.find({}, function(err, docs){
		if (err){
			console.log(err)
		}
		else{
			console.log(docs)
			res.render('index', {"data":docs})
		}
	});
});
module.exports = router;