var config = require('config');

exports.getDefaultWebHook = function() {
	var defaultWebhook = config.get('defaultWebhook');
	if (!defaultWebhook) {
		console.warn('Warning: Default Webhook not provided in config');
	}
	return defaultWebhook;
};
