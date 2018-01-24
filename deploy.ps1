
if (Test-Path "./deploy") {
	Remove-Item -path "./deploy" -recurse
}

New-Item -Path ./deploy -ItemType Directory -Force

[Reflection.Assembly]::LoadWithPartialName( "System.IO.Compression.FileSystem" )
[System.IO.Compression.ZipFile]::CreateFromDirectory("./deploy/bin", "./deploy/compressed/package.zip")

aws --region us-east-1 cloudformation deploy --template-file "./Stack.json" --stack-name GreetStack

Read-Host -Prompt "Press Enter to exit"