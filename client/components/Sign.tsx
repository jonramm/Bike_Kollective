import React, {useRef} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const Sign = ({onOK}) => {
    const ref = useRef() as any;
  
    const handleSignature = signature => {
      console.log(signature);
      onOK(signature);
    };
  
    const handleClear = () => {
        ref.current.clearSignature();
    }
  
    const handleConfirm = () => {
      console.log("end");
      ref.current.readSignature();
    }
  
    const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <SignatureScreen
              ref={ref}
              onOK={handleSignature}
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
              // dataURL={url}
          />
        </View>
        <View style={styles.row}>
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
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
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
      // backgroundColor: 'green',
      height: 150
    },
    sign: {
      backgroundColor: 'transparent'
    }
  });