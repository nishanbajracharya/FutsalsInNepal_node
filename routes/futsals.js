var express = require('express');
var router = express.Router();
var Futsal = require('../model/model.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
	extended: true
}));

router.use(bodyParser.json());

/* GET users listing. */
router.route('/add').get(function(req, res, next) {
	res.render("add",{title: 'Futsals In Nepal'});
});


router.route('/:name').get(function(req,res){
	var name = req.params.name;
	Futsal.findOne({name:name},function(err,data){
		if(err) throw err;
		console.log(data);
		res.render("each",{title:"Futsals In Nepal", results:data})
	})
})

router.route('/:name/edit').get(function(req,res){
	var name = req.params.name;
	Futsal.findOne({name:name},function(err,data){
		if(err) throw err;
		//console.log(data);
		res.render("edit",{title:"Futsals In Nepal", results:data})
	})
})

router.route('/:name/edit').post(function(req,res){
	var name = req.params.name;
	var nameNew = req.body.name;
	var address = req.body.address;
	var phone = Number(req.body.phone);
	var rate = Number(req.body.rate);
	var openhours = req.body.openhours;
	//console.log(rate);
	//console.log(Futsal);
	Futsal.findOneAndUpdate({name:name},
	{
		name: nameNew,
		address: address,
		phone: phone,
		rate: rate,
		openhours: openhours
	},
	function(err,data){
		if(err) {
			console.log("!!!!!!!#################Error");
			throw err;
		}
		console.log("Updated");
	})
	return res.redirect("/");
})

router.route('/add').post(function(req,res){
	var name = req.body.name;
	var address = req.body.address;
	var phone = req.body.phone;
	var rate = req.body.rate;
	var openhours = req.body.openhours;
	var closehours = req.body.closehours;
	var coordinates = req.body.coordinates;
	var futsal = new Futsal({
		name: name,
		address: address,
		map:coordinates,
		phone: phone,
		rate: rate,
		openhours: openhours+"-"+closehours
	})

	futsal.save(function(err){
		if (err) throw err;

		console.log('Futsal saved successfully!');
	})
	return res.redirect("/");
})


router.route('/delete/:name').get(function(req,res){
	var name = req.params.name;
	console.log("Delete "+name);
	/*Futsal.remove({name:name},function(err){
		if(err) throw err;
		console.log("Deleted");
	})*/
	return res.redirect("/");
})

module.exports = router;
