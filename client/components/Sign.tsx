import React, {useRef} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import SignatureScreen from 'react-native-signature-canvas';

const Sign = ({onOK}) => {

    const ref = useRef() as any;

    const navigation = useNavigation();
  
    const handleClear = () => {
        ref.current.clearSignature();
    }
  
    const handleConfirm = () => {
      ref.current.readSignature();
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <SignatureScreen
              ref={ref}
              onOK={(signature => onOK(signature))}
              style={styles.sign}
              webviewContainerStyle={styles.sign}
              webStyle={`
                  .m-signature-pad {
                    background-color: transparent;
                  }
                  .m-signature-pad {
                    flex: 1;
                    box-shadow: none;
                    border-radius: 10px;
                  }
                  .m-signature-pad--footer {
                    display: none;
                  }
                  `}
              backgroundColor={'rgba(0,0,0,0)'}
          />
        </View>
        <View style={styles.row}>
          <Button
            title='Go back'
            onPress={() => navigation.goBack()}
          />
          <Button
              title="Clear"
              onPress={handleClear}
          />
          <Button
              title="Confirm"
              onPress={handleConfirm}
          />
        </View>
      </View>
    );
  }
  
  export default Sign;
  
  const styles = StyleSheet.create({
    container: {
      flex: .5,
      padding: 10,
      backgroundColor: 'white',
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      height: 50,
      backgroundColor: 'white'
    },
    box: {
      height: 120
    },
    sign: {
      backgroundColor: 'transparent'
    }
  });