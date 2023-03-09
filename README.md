# Bike_Kollective

Bike Kollective is a mobile bike sharing app that allows users
to find and check out bikes, or add their own bike to the network.


**Installation**

Testing on an emulator (recommended):

For iOS:
  1. Download the iOS gzip file. 
  2. You can run the build using Xcode Simulator. Open a simulator via Xcode > Open Developer Tools > Simulator. 
  3. Select an iPhone model. 
  4. Unzip the downloaded .gzip file. 
  5. Drag the unzipped client app file into the simulator. 
  6. Click the client app from within the simulator.

For Android:
  1. Download the Android apk file. 
  2. You can install the app directly on your phone by opening the .apk on your phone, which will ask to install an unknown app. Please enable installing unknown apps in your      phone’s settings. 
  3. Alternatively, you can run an emulator on your laptop, by opening Android Studio > File > Profile or Debug APK > Select the .apk file. 
  4. Set up a AVD to run the emulator or you can plug in an Android device to your laptop via USB (first enable developer options on your phone) and run the app on a physical      device. 

Note: 
If you receive this error when testing the .apk file: 
The APK failed to install.
Error: INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package com.bikekollective.bikekollective signatures do not match previously installed version; ignoring!

Make sure to delete any old versions of the app from the emulator first before installing the latest apk.

**Testing with Expo Go**

1. Download the Expo Go mobile app.

2. If you have an Android phone, scan the following QR code then open the provided link to open the Bike Kollective mobile app with your phone. 

![bike_collective_qr_droid.png](./tests/qr/bike_collective_qr_droid.png)

3. If you have an iOS phone, scan the following QR code then open the provided link to open the Bike Kollective mobile app with your phone. 

![bike_collective_qr_ios.png](./tests/qr/bike_collective_qr_ios.png)

4. If you have not registered an account, provide an email and password then press the 'register' button.

5. If you already have an account, enter your email and password then press the 'log in' button.
