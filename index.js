var config = require('./src/configWrapper.js');
var publisher = require('./src/slackPublisher.js');

exports.handler = function(event, context) {
	var promises = [];
	event.Records.forEach((record) => {
		var SnsMessageId = event.record.Sns.MessageId;
		var SnsPublishTime = event.record.Sns.Timestamp;
		var SnsTopicArn = event.record.Sns.TopicArn;
		var messageAttributes = event.record.Sns.MessageAttributes;

		var webHook = messageAttributes ? messageAttributes : config.getDefaultWebHook();
		var publishPromise = publisher.publishSlackMessage(message, webHook);
		promises.push(publishPromise);
	});

	Promise.all(promises).then(function() {});
};
