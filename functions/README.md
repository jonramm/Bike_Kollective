**How to run the Firebase project locally**

1. Go to the Firebase console > Project Settings > Service Accounts. Click Generate a new private key for Node.js. Store the json file locally.

2. Install firebase tools via `npm install -g firebase-tools`. Resource: https://firebase.google.com/docs/cli#windows-npm

3. In cli, login to firebase via `firebase login`.

4. In the root of the project, run the following in the terminal: export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json". The path should be set in reference to functions folder.

5. Run `npm install` in 3 places: 
- Root of the project. 
- Within the functions folder. The functions folder houses all the server code that will run in Firebase Cloud Functions.
- Within the clients folder. The client folder houses all the client code.

6. Always run `npm run build` within the functions folder before running firebase emulators or deploying to production. Doing so will create a lib folder in the functions directory (this converts typescript files to javascript). Resource: https://firebase.google.com/docs/functions/typescript

7. To run the firebase emulator (local version of every firebase feature needed for the app: authentication, firestore, cloud storage, cloud functions), go to the root of the project folder, execute `firebase emulators:start`. Resource: https://firebase.google.com/docs/functions/local-emulator

8. Alteratively, you can run `npm run serve` or `npm run shell` (see package.json in the functions folder for further details). These are shortcuts to run the build and serve/start the functions shell.

10. Access the emulated server via http://127.0.0.1:5001/bike-kollective-project/us-central1/app (or whatever the emulator says is the url).

11. Another option is run `firebase serve`. Resource: https://firebase.google.com/docs/cli#test-locally

**How to deploy Firebase project to production**
1. Run `npm run build` in the functions folder.

2. Execute `npm run deploy` in the functions. This will deploy whatever is built in the lib folder. 

3. Access the production server via https://us-central1-bike-kollective-project.cloudfunctions.net/app.