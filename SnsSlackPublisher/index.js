var config = require('./src/configWrapper.js');
var publisher = require('./src/slackPublisher.js');

exports.handler = function(event, context) {
	var promises = [];
	event.Records.forEach((record) => {
		var SnsMessageId = record.Sns.MessageId;
		var SnsPublishTime = record.Sns.Timestamp;
		var SnsTopicArn = record.Sns.TopicArn;
		var messageAttributes = record.Sns.MessageAttributes;
		var message = record.Sns.Message;

		var webHook = messageAttributes.SlackWebhook
			? messageAttributes.SlackWebhook.Value
			: config.getDefaultWebHook();

		console.log('webhook is : ');
		console.log(webHook);

		var publishPromise = publisher.publishSlackMessage(message, webHook);
		promises.push(publishPromise);
	});

	Promise.all(promises).then(function() {
		console.log('Completed Processing');
	});
};
