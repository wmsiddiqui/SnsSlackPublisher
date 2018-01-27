var config = require('./src/configWrapper.js');
var publisher = require('./src/slackPublisher.js');

exports.handler = function(event, context) {
	var promises = [];
	event.Records.forEach((record) => {
		var SnsMessageId = record.Sns.MessageId;
		var SnsPublishTime = record.Sns.Timestamp;
		var snsTopicArn = record.Sns.TopicArn;
		var snsTopic = snsTopicArn.split(':')[5];
		var messageAttributes = record.Sns.MessageAttributes;
		var message = record.Sns.Message;

		var webHook = messageAttributes.SlackWebhook
			? messageAttributes.SlackWebhook.Value
			: config.getDefaultWebHook();

		var publishPromise = publisher.publishSlackMessage(message, webHook, snsTopic);
		promises.push(publishPromise);
	});

	Promise.all(promises).then(function() {
		console.log('Completed Processing');
	});
};
