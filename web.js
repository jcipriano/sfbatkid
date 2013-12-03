var
express = require('express'),
path = require('path'),
Twitter = require('./lib/Twitter').Twitter,
app = express();

app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));


var twitter = new Twitter({
  'consumerKey': '',
  'consumerSecret': '',
  'accessToken': '',
  'accessTokenSecret': '',
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