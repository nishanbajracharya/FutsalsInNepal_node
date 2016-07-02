var express = require('express');
var router = express.Router();
var Futsal = require('../model/model.js');

/* GET home page. */


router.get('/', function(req, res, next) {
	Futsal.find({},function(err,data){
		if(err) throw err;
		//console.log(data);
		var mapShow = [];
		/*for(i in data){
			if(data[i].map!=undefined) mapShow.push(data[i]);
		}*/
		res.render('index', { title: 'Futsals In Nepal' , results:data});
	});
});

module.exports = router;
