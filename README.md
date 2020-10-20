# SaveDatMoney
Smart budget/financial planner.

Clone repo via https by using the following link:
`https://github.com/nlyra/SaveDatMoney.git` 

To get the expo client installed on your machine, run:
`npm install -g expo-cli`
You might have to add keyword `sudo` before the previous command if permissions access is denied.

If you'd like to see official documentation for setting up the environment instead, please click here: https://reactnative.dev/docs/environment-setup

We are using Expo client for our development, which is a framework/library tool built around React Native that allows and facilitates us to develop, build, and deploy iOS, Android, and web apps from the same codebase. Click here to check our their official docs: https://docs.expo.io/

To run your project, navigate to the directory and run one of the following npm commands:
- `cd SaveDatMoney`
- `npm start` # you can open iOS, Android, or web from here, or run them directly with the commands below.
- `npm run android`
- `npm run ios`
- `npm run web`

If you'd like to run your project directly on your physical device (iOS or Android), please go to either Google Play store or App Store and download "Expo Client" app (it's got a white and black picture with their logo on it), and follow the onscreen instructions to run it. 
For connection selection choose "Tunnel" instead of "LAN" or "Local" and use your phone's camera to scan the QR code.


Deployment (Firebase):

If this is your first time, you need to install Firebase CLI first to have access to the command line commands.
Accept the project invite to Firebase (need a gmail account).
- `npm install -g firebase-tools` # This will install the CLI on your machine.
- `firebase login` # Log in to your firebase account from the command line.
- `firebase projects:list` # This will display the projects you have access to on your firebase (just to double check).
Once you have successfully installed and logged into firebase, you can deploy the app by using:
- `npm run deploy-hosting`

If you are still having issues or would like to look at official docs, see here:

Expo docs on deploying to firebase:
- https://docs.expo.io/distribution/publishing-websites/#firebase-hosting 

Firebase docs for installing and running:
- https://firebase.google.com/docs/cli#install-cli-windows
