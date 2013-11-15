var
express = require('express'),
path = require('path'),
Twitter = require('./lib/Twitter').Twitter,
app = express();

app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));


var twitter = new Twitter({
  'consumerKey': 'flciwzpXQFTwqVCFlEGkQ',
  'consumerSecret': 'TtG1ZmR04uHOD5hH8NQ3xp78BaP5R7WkExkZ2R0',
  'accessToken': '4534871-qxwj0NHckNfbJfYrBvI7LoLkpM6rCeFW5lNPAwVHxk',
  'accessTokenSecret': 'pZ92BI6AuqHtYWLaKTmID45OWru66BD3IITh2CKC9gfxE',
  'callBackUrl': ''
});

app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

app.get('/search', function(req, res) {
    res.sendfile('public/search.html');
});

app.get('/search/:term', function(req, resp) {

	var error = function (err, response, body) {
	    resp.send(err);
	};

	var success = function (data) {
	    resp.json(JSON.parse(data));
	};

	var options = {
		q: req.params.term,
		count: 100
	};

	if(req.params.maxid) {
		options.max_id = req.params.maxid;
	}

  twitter.search(options, error, success);
});

app.get('/search/:term/:maxid', function(req, resp) {

	var error = function (err, response, body) {
	    resp.send(err);
	};

	var success = function (data) {
	    resp.json(JSON.parse(data));
	};

	var options = {
		q: req.params.term,
		count: 100,
		max_id: req.params.maxid
	};

  twitter.search(options, error, success);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});