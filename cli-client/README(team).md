If you are using Windows, and you want to be able to run the CLI tool even when you are not in the cli/directory, using the command se2315, instead of node cli.js, follow these additional steps:

a.Create a file named se2315.ps1 and add the following code: node c:\your-path\to\SoftEng23-15\cli\cli.js @args

b.In the path "C:\Users\(user_name)\Documents\" create a folder named WindowsPowerShell and inside create a file with the following name: Profile.ps1

c.Open the powershell as an administrator and run the following command: New-Item -Path $Profile.CurrentUserAllHosts -Type File -Force

c.Inside the file type the following code

node c:\your-path\to\SoftEng23-15\cli\cli.js @args
Set-Alias se2228 c:\your-path\to\SoftEng22-28\cli\se2228.ps1

d.save and close the text editor

g.In case you can't run scripts on your computer run the following command in the powershell:

Set-ExecutionPolicy Unrestricted -Scope CurrentUser