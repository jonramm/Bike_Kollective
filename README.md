# Bike_Kollective

Bike Kollective is a mobile bike sharing app that allows users
to find and check out bikes, or add their own bike to the network.


**How to test the application:**

1. Download the Expo Go mobile app.

2. If you have an Android phone, scan the following QR code then open the provided link to open the Bike Kollective mobile app with your phone. 

3. If you have an iOS phone, scan the following QR code then open the provided link to open the Bike Kollective mobile app with your phone. 
![bike_collective_qr_ios.png](./tests/qr/bike_collective_qr_ios.png)

4. If you have not registered an account, provide an email and password then press the 'register' button.
![bike_collective_qr_droid.png](./tests/qr/bike_collective_qr_droid.png)

5. If you already have an account, enter your email and password then press the 'log in' button.


**Setting up a development environment:**

1. Clone git repository to your local computer.

2. `cd` to the root of the project folder.

3. Run `npm install` in the root directory, the 'client' folder and the 'functions' folder.

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

12. Open a second tab in your terminal then `cd` to the 'client' folder. 

13. Run `npx expo start`. This will start the Metro bundler for the mobile app.

14. Download the Expo Go mobile app.

15. Scan the QR code with your phone and open Expo Go with the provided link.


**How to deploy Firebase project to production**
1. Run `npm run build` in the functions folder.

2. Execute `npm run deploy` in the functions. This will deploy whatever is built in the lib folder. 

3. Access the production server via https://us-central1-bike-kollective-project.cloudfunctions.net/app.
