var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
	_headlineId: {
		type: Schema.Types.ObjectId,
		ref: "headline"
	},
	date: String,
	noteText: String
	});

var note = mongoose.model("note", noteSchema);

module.exports = Note;