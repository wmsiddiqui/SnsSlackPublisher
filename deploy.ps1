param (
    [string]$bucket = $( Read-Host "Input an existing s3 bucket to deploy to" ),
    [string]$defaultWebhook = $( Read-Host "Input default webhook url to publish Slack messages" )
)

$stack = "./stack.json"
$deploy = "./deploy.json"

npm install

aws cloudformation package --template-file $stack --s3-bucket $bucket --output-template-file $deploy --use-json

aws --region us-east-1 cloudformation deploy --template-file $deploy --stack-name SnsSlackStack --capabilities CAPABILITY_IAM

Remove-Item -path $deploy

Read-Host -Prompt "Press Enter to exit"