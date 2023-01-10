/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Image,
    PermissionsAndroid,
    ImageBackground,
  } from 'react-native';
  import React, { useContext, useEffect } from 'react';
  import { colors } from '../../src/constants';
  import { useNavigation } from '@react-navigation/native';
//   import InsetShadow from 'react-native-inset-shadow';
  import axios from 'axios';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
    MaskSymbol,
    isLastFilledCell,
  } from 'react-native-confirmation-code-field';
  import { Button, Snackbar } from 'react-native-paper';
//   import Clipboard from '@react-native-community/react-native-clipboard';
//   import AuthContext from '../../Context/AuthContex';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const CELL_COUNT = 6;
  const TwoFactorOTP = (props) => {
 
  
    // const Getdata = async () => {
    //   try {
    //     const Data = await AsyncStorage.getItem('Key')
    //     console.log('getData==>', JSON.parse(Data))
    //   }
    //   catch (e) {
    //     console.log('Async Get Error', e)
    //   }
    // }
    // const { user } = useContext(AuthContext)
    // console.log('first userAuth', user)
    const { formData, response } = props.route.params;
    // changeback
    const { raw_secret_key } = formData;
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    // console.log('raw_secret_key', response.data)
  
    const otpInput = React.useRef(null);
    const navigation = useNavigation();
    const [timerCount, setTimer] = React.useState(60);
  
    const handleDownload = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //alert('You can use the location');
          console.log('write granted');
          // var RNFS = require('react-native-fs');
          let timestamp = new Date().getTime().toString();
          var path = RNFS.ExternalStorageDirectoryPath + `/Download/proassetz-key-${timestamp}.txt`;
          // console.log(path, '***path*8');
          // write the file
          RNFS.writeFile(path, `${raw_secret_key}`, 'utf8')
            .then((success) => {
              alert('Key file saved in download folder');
            })
            .catch((err) => {
              alert(err.message);
            });
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };
    const renderCell = ({ index, symbol, isFocused }) => {
      let textChild = null;
  
      if (symbol) {
        textChild = <Text isLastFilledCell={isLastFilledCell({ index, value })}>{symbol}</Text>;
        if (index === 5 && symbol !== '') {
          setOtpDone(true);
        }
      } else if (isFocused) {
        textChild = <Cursor />;
      }
  
      return (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {textChild}
        </Text>
      );
    };
    const copyToClipboard = () => {
      Clipboard.setString(`key is : ${raw_secret_key}`);
      setSnackMssg('Copied to clipboard');
      onToggleSnackBar();
    };
    React.useEffect(() => {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }, []);
    const [verified, setVerified] = React.useState(false);
    const [otpDone, setOtpDone] = React.useState(false);
    const handleVerifyTwoFacOTP = (otp) => {
      const nokey = { email: formData.email, password: formData.password };
      let reqBody = {
        ...nokey,
        google_otp: otp,
      };
      console.log('insisde 2fact otp', reqBody);
      axios
        .post('https://www.proassetz.com/api/v1/user-login/', reqBody)
        .then(async function (response) {
          console.log(response);
          const auth = { 
            token: response.data.data.token, // Authentication token
          };
          console.log(auth, 'otpage');
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
          setVerified(true);
          if (raw_secret_key === undefined) { navigation.navigate("FBDScreen") }
        })
        .catch(function (error) {
          // alert(JSON.stringify(error.response.data.message));
          if (error.response.data.message.english) {
            alert(JSON.stringify(error.response.data.message.english));
          } else {
            alert(JSON.stringify(error.response.data.message));
          }
          // console.log(error.response.data);
        });
    };
    const renderOTP = () => {
      return (
        <View style={styles.container}>
          {/* <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>Type your OTP</Text> */}
          <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 150 }}>Type your OTP</Text>
  
          <CodeField
            ref={ref}
            {...props2}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          {/* <Text style={{ color: '#E29224', textAlign: 'center' }}>
            0.{timerCount} <Text style={{ color: '#6E6E6E' }}>min</Text>
          </Text> */}
          {/* <Pressable
            style={styles.button}
            //   disabled={!otpDone ? true : false}
            onPress={() => {
              if (otpDone) {
                // setVerified(true);
                handleVerifyTwoFacOTP(value);
              } else {
                alert('OTP invalid');
              }
            }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Verify</Text>
          </Pressable> */}
          <Button
            disabled={false}
            dark={false}
            style={{ ...styles.button, width: 150, marginTop: 40 }}
            onPress={() => {
              if (otpDone) {
                // setVerified(true);
                handleVerifyTwoFacOTP(value);
              } else {
                alert('OTP invalid');
              }
            }}
            compact={false}
            contentStyle={{
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 0,
              margin: 0,
            }}
            mode="contained">
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito-SemiBold',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#473200',
              }}>
              Verify
            </Text>
          </Button>
          {/* <Text style={{ color: '#E29224', textAlign: 'center' }}>Resend</Text> */}
        </View>
      );
    };
    const renderVerified = () => {
      return (
        <View style={styles.container}>
          {/* <Text>2 Factor Authentication OTP</Text> */}
          <View style={styles.innerContainer}>
            <Text style={{ color: '#C4C4C4', textAlign: 'center', marginTop: 50, marginBottom: 10 }}>
              2 factor authentication{' '}
            </Text>
            <Text
              style={{
                color: '#38C976',
                textAlign: 'center',
                marginTop: 0,
                marginBottom: 150,
                fontSize: 40,
                fontFamily: 'Monstserrat-Regular',
                fontWeight: '700',
              }}>
              Verified{' '}
            </Text>
            <ImageBackground
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 30,
                top: -40,
              }}
              source={require('../../assets/copyshadow.png')}
              resizeMode="stretch">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  width: 280,
                  padding: 10,
                  position: 'relative',
                }}>
                <View>
                  <Text selectable={true} style={{ color: '#fff', textAlign: 'center' }}>
                    {raw_secret_key}
                  </Text>
                </View>
                <Button
                  style={{ position: 'absolute', right: '-8%', top: 5, zIndex: 10 }}
                  labelStyle={{ fontSize: 22, lineHeight: 1 }}
                  onPress={copyToClipboard}
                  // contentStyle={{ width: 15, display: 'flex' }}
                  icon="content-copy"
                  color="#6E6E6E"
                />
              </View>
            </ImageBackground>
          </View>
  
          <TouchableOpacity
            onPress={handleDownload}
            style={{
              width: 280,
              height: 60,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/back.png')}
              style={{
                width: '100%',
                height: 60,
                resizeMode: 'contain',
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <Text style={{ color: '#E09D00', textAlign: 'center', fontSize: 18 }}> Download Key</Text>
          </TouchableOpacity>
          <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 50, marginBottom: 10 }}>
            Keep Seed Key Safe for OTP Recovery
          </Text>
          <Text style={{ color: '#6E6E6E', textAlign: 'center', fontSize: 18 }}>
            Download 2FA Backup Key to Contuine
          </Text>
          {/* <Pressable style={styles.button} onPress={() => navigation.navigate('KYC')}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Continue</Text>
          </Pressable> */}
          <Button
            disabled={false}
            dark={false}
            style={styles.button}
            //onPress={() => navigation.navigate('KYC')}
            compact={false}
            contentStyle={{
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 0,
              margin: 0,
            }}
            mode="contained">
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito-SemiBold',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#473200',
              }}>
              Continue
            </Text>
          </Button>
        </View>
      );
    };
    const [snackMssg, setSnackMssg] = React.useState('');
  
    const [visibleS, setVisibleS] = React.useState(false);
    const onToggleSnackBar = () => setVisibleS(!visibleS);
  
    const onDismissSnackBar = () => setVisibleS(false);
    return (
      <View style={{ height: '100%', backgroundColor: colors.bgColor, paddingTop: 10 }}>
        <Snackbar
          wrapperStyle={{ elevation: 3, zIndex: 3 }}
          style={{ elevation: 3, zIndex: 3 }}
          visible={visibleS}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Close',
            onPress: () => {
              // Do something
            },
          }}>
          {snackMssg}
        </Snackbar>
        <View>
          <Text
            style={{
              color: '#E09D00',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '600',
              lineHeight: 30,
            }}>
            2 Factor <Text style={{ color: '#fff' }}>Authentication</Text>
            {'\n'} OTP
            {/* {'\n'}2 Factor Authentication OTP */}
          </Text>
        </View>
        {!verified ? renderOTP() : renderVerified()}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginVertical: 20 },
    cell: {
      width: 50,
      height: 50,
      lineHeight: 45,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      borderWidth: 0,
      color: 'white',
      borderRadius: 5,
      borderColor: 'transparent',
      backgroundColor: '#3B3B3B',
      textAlign: 'center',
      margin: 5,
    },
    focusCell: {
      borderColor: '#000',
    },
    container: {
      backgroundColor: colors.bgColor,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      // paddingTop: 0,
      position: 'relative',
    },
    rowcon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    innerContainer: {
      padding: 40,
      flex: 2,
      justifyContent: 'flex-start',
    },
    input: {
      backgroundColor: '#424040',
      color: '#fff',
      borderRadius: 5,
      height: 55,
      marginHorizontal: 15,
    },
    inputWrapper: {
      backgroundColor: 'transparent',
      marginTop: 10,
      padding: 3,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },
    alignment: { textAlign: 'left' },
    indicatorContainer: {
      paddingHorizontal: 40,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    logo: {
      marginHorizontal: 0,
      marginVertical: 20,
      // width: 200,
    },
    rupee: {},
    boldHeading: {
      fontSize: 50,
      color: colors.yellowDark,
      fontWeight: '900',
      // letterSpacing: 1,
    },
    regularHeading: {
      fontSize: 32,
      color: 'white',
      textAlign: 'left',
      width: '100%',
      marginLeft: 40,
    },
    regularHeading2: {
      fontSize: 32,
      color: 'white',
    },
    button: {
      width: '90%',
      alignSelf: 'stretch',
      backgroundColor: `${colors.yellowLg}`,
      padding: 0,
      height: 46,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      marginBottom: 40,
      borderRadius: 10,
    },
  });
  
  export default TwoFactorOTP;
  