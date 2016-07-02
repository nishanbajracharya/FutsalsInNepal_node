var express = require('express');
var router = express.Router();
var Futsal = require('../model/model.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
	extended: true
}));

router.use(bodyParser.json());

/* GET users listing. */
router.get('/add', function(req, res, next) {
	res.render("add",{title: 'Futsals In Nepal'});
});

router.post('/add',function(req,res){
	var name = req.body.name;
	var address = req.body.address;
	var phone = req.body.phone;
	var rate = req.body.rate;
	var openhours = req.body.openhours;
	var coordinates = req.body.coordinates;
	var futsal = new Futsal({
		name: name,
		address: address,
		map:coordinates,
		phone: phone,
		rate: rate,
		openhours: openhours
	})

	futsal.save(function(err){
		if (err) throw err;

		console.log('Futsal saved successfully!');
	})
	return res.redirect("/");
})

router.get('/:name',function(req,res){
	var name = req.params.name;
	Futsal.findOne({name:name},function(err,data){
		if(err) throw err;
		console.log(data);
		res.render("each",{title:"Futsals In Nepal", results:data})
	})
})

module.exports = router;
