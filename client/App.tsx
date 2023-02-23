import React from "react";
import { AuthProvider } from './navigation/AuthProvider';
import Routes from "./navigation/Routes";
import 'react-native-gesture-handler';
import { 
  useFonts, 
  OpenSans_300Light, 
  OpenSans_400Regular, 
  OpenSans_600SemiBold, 
  OpenSans_700Bold, 
  OpenSans_800ExtraBold, 
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic 
} from "@expo-google-fonts/open-sans";


export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic 
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
