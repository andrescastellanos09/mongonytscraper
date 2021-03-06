// module scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// models
var headline = require("../models/headline");

module.exports = {
	fetch: function(cb) {
		scrape(function(data) {
			var articles = data;
			for (var i=0; i<articles.length; i++) {
				articles[i].date = makeDate();
				articles[i].saved = false;
			}

			headline.collection.insertMany(articles, {ordered: false}, function(err, docs) {
				cb(err, docs);
			});
		});
	},
	delete: function(query, cb) {
		headline.remove(query, cb);
	},
	get: function(query, cb) {
		headline.find(query)
		.sort({
			_id: -1
		})
		.exec(function(err, doc) {
			cb(doc);
		});
	},
	update: function(query, cb) {
		headline.update({_id: query._id}, {
			$set: query
		}, {}, cb);
	}

};
