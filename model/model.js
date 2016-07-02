var mongoose = require('mongoose');

var FutsalSchema = new mongoose.Schema({
	name : String,
	address : String,
	map: String,
	phone : Number,
	rate : Number,
	openhours : String,
	email : String,
	owner : String,
	updated_at: String
});

FutsalSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.updated_at)
    this.updated_at = currentDate.toISOString();

  next();
});

var Futsal = mongoose.model('Futsal',FutsalSchema);

module.exports = Futsal;