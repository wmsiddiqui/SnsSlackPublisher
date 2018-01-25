const https = require('https');
const url = require('url');

exports.publishSlackMessage = function(message, webHook) {
	console.log('publishing to webhook');
	console.log(webHook);
	return new Promise(function(resolve, reject) {
		const reqOpts = url.parse(webHook);
		reqOpts.method = 'POST';
		reqOpts.headers = { 'Content-Type': 'application/json' };

		var req = https.request(reqOpts, function(res) {
			if (res.statusCode === 200) {
				console.log('Published message to channel ' + webHook);
			} else {
				console.log('Error posting to webhook ' + message.slackWebHook);
			}
			resolve();
		});

		req.on('error', function(e) {
			console.log('Request posting to Slack was invalid:' + e.message);
			resolve();
		});

		req.write(JSON.stringify({ text: JSON.stringify(message.message.Body, null, ' '), username: user }));

		req.end();
	});
};
