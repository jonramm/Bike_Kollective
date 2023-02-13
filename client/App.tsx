import React from "react";

import {AuthProvider} from './navigation/AuthProvider';
import Routes from "./navigation/Routes";
import 'react-native-gesture-handler';

export default function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
