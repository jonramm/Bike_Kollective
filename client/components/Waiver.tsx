import React from "react";
import {
  View,
  LogBox
} from "react-native";
import Sign from "./Sign";
import BikeWaiverView from "./BikeWaiverView";
import UserWaiverView from "./UserWaiverView";

const Waiver = ({ route }) => {

  // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  // Since we're not using state persistence or deep linking
  // we can safely ignore this warning.
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {route.params.waiverType === 'bike'
        ? <BikeWaiverView />
        : <UserWaiverView />
      }
      <Sign
        onOK={route.params.onOk}
      />
    </View>
  )
};

export default Waiver;