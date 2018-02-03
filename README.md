# SnsSlackPublisher
A Lambda application written in Node.js that publishes incoming SNS messages to a Slack channel. Easily deployable using Powershell, AWS CLI, and Cloudformation. If you already have an AWS account setup, the application only takes a few keystrokes to deploy.

## Recommended Requirements 
* Windows 10
* Node 8.0.0
* NPM 5.6.0
* [AWS CLI Installed](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [AWS CLI configured to use your access key](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
* An S3 bucket already created, for which you have write access through the CLI

## Instructions
* [Setup a Slack webhook for your channel](https://savolabs.slack.com/apps/A0F7XDUAZ-incoming-webhooks), if one doesn't already exist.
* Clone this repository.
* Execute "deploy.ps1"
* Enter the **name** of the S3 bucket you want to deploy to.
* Enter the Slack webhook URL you wish to publish to
* Once deployed successfully, subscribe the Lambda to an SNS topic using the AWS Management Console. 
* Now any incoming SNS message on that topic will trigger this Lambda, and will post to your Slack Channel!

### Optional Rerouting of SNS Messages
Once you subscribe this Lambda to an SNS Topic, you can choose to re-route those SNS messages to a Slack channel other than the default.

On the SNS Message itself, you will have to add a Message Attribute of type String, with the key of "SlackWebhook", and a value with the Slack Webhook's url. That message will be delivered to the url specified, not the default URL.
