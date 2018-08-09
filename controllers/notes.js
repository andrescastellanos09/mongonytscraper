

var note = require("../models/note");
var dates = require("../scripts/date");

module.exports = {
	get: function(data, cb) {
		note.find({
			_headlineId: data._id
		}, cb);
	},
	save: function(data, cb) {
		var newnote = {
			_headlineId: data._id,
			date: makeDate(),
			noteText: data.noteText
		};

		note.create(newnote, function (err, doc) {
			if (err) {
				console.log(err);
			} else {
				console.log(doc);
				cb(doc);
			}
		});
	},
	delete: function(data, cb) {
		note.remove({
			_id: data._id
		}, cb);
	}
};