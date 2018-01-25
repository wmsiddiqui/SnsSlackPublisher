
if (Test-Path "../deploy") {
	Remove-Item -path "../deploy" -recurse
}

New-Item -Path ../deploy -ItemType Directory -Force

[Reflection.Assembly]::LoadWithPartialName( "System.IO.Compression.FileSystem" )
[System.IO.Compression.ZipFile]::CreateFromDirectory("./", "../deploy/package.zip")

aws s3 cp ../deploy/package.zip s3://greet-lambda/snsSlack.zip

aws --region us-east-1 cloudformation deploy --template-file "./Stack.json" --stack-name SnsSlackStack

Read-Host -Prompt "Press Enter to exit"