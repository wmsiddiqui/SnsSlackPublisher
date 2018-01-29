# SnsSlackPublisher
A Lambda that publishes an incoming SNS event to a given slack webhook. Includes a CloudFormation stack and a powershell script to easily deploy the application to your AWS account using the AWS CLI.

## Recommended Requirements 
* Windows 10
* Node 8.0.0
* NPM 5.6.0
* [AWS CLI Installed](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [AWS CLI configured to use your access key](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

## Instructions
* [Setup a Slack webhook for your channel](https://savolabs.slack.com/apps/A0F7XDUAZ-incoming-webhooks), if one doesn't already exist.
* Clone this repository.
* Edit the "default.json" file under "config" to change the default webhook.
* Change the "greet-lambda" in the deploy.ps1 file to a S3 bucket you have access to. 
* Execute "deploy.ps1"
* Once deployed successfully, subscribe the Lambda to an SNS topic using the AWS Management Console. 
* Now any incoming SNS message on that topic will trigger this Lambda, and will post to your Slack Channel!

### Optional Rerouting of SNS Messages
Once you subscribe this Lambda to an SNS Topic, you can choose to re-route those SNS messages to a Slack channel other than the default.

On the SNS Message itself, you will have to add a Message Attribute of type String, with the key of "SlackWebhook", and a value with the Slack Webhook's url. That message will be delivered to the url specified, not the default URL.


## Coming Soon
* Parameterization of the bucket name and default webhook
* Check to ensure the bucket exists before trying to push to it
* Possibly create the bucket if it doesn't exist
