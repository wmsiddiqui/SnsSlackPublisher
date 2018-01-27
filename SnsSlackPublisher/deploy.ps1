	$stack = "./stack.json"
	$deploy = "./deploy.json"

aws cloudformation package --template-file $stack --s3-bucket "greet-lambda" --output-template-file $deploy --use-json

aws --region us-east-1 cloudformation deploy --template-file $deploy --stack-name SnsSlackStack --capabilities CAPABILITY_IAM

Read-Host -Prompt "Press Enter to exit"