/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ImageBackground,
  
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../src/constants'; 
import { useNavigation } from '@react-navigation/native';
import { Button, Snackbar } from 'react-native-paper';
import { Linking, Platform } from 'react-native';
// import QRCode from 'qrcode';
import { SvgXml, SvgUri } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';
// import Clipboard from '@react-native-community/react-native-clipboard';

const generateQRCode = async (secret) => {
  return await QRCode.toDataURL(secret, 'image/png');
};
const TwoFactorAuthQR = (props) => {
  const navigation = useNavigation();
  const { raw_secret_key,secret_key, email, password } = props.route.params.qrPageData;
  const formData = { email, password, raw_secret_key };
  console.log(props?.route?.params, 'qrdata');
  const iosUrl = 'itms-apps://apps.apple.com/US/app/id388497605';
  const androidUrl =
    'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2';
    //const googleAuthUrl = `otpauth://totp/PROASSETZ:${email}?secret=${secret}&issuer=PROASSETZ`;
      // let raw_secret_key = 'asddasds',
      // secret_key = 'JX7YQQNKU4F77YY7',
      // email = 'ranomander712%40gmail.com',
      // password = 'sad';
    const googleAuthUrl = secret_key;
    const googleAuthUrlTest =
    'otpauth://totp/PROASSETZ-ranomander712%40gmail.com?secret=JX7YQQNKU4F77YY7';
      function openGoogleAuth() {
        Linking.openURL(googleAuthUrl).catch(async () => {
          if (Platform.OS === 'ios') {
            const supported = await Linking.canOpenURL(iosUrl);
            supported && (await Linking.openURL(iosUrl));
          } else if (Platform.OS === 'android') {
            const supported = await Linking.canOpenURL(androidUrl);
            supported && (await Linking.openURL(androidUrl));
          }
        });
      }
  const [qrImageUri, setQrImageUri] = React.useState('');
  React.useEffect(() => {
    // generateQRCode(googleAuthUrlTest)
    //   .then((res) => {
    //     setQrImageUri(res);
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
    // QRCode.toDataURL(googleAuthUrlTest, { type: 'data' }, (err, url) => {
    //   setQrImageUri(url);
    //   // let a = url.toString()
    //   alert(err)
    // });
    // QRCode.toString('test', function (err, url) {
    //   setQrImageUri(url);
    //   // let a = url.toString()
    //   // alert(url);
    // });
  }, []);
  const [snackMssg, setSnackMssg] = React.useState('');

  const [visibleS, setVisibleS] = React.useState(false);
  const onToggleSnackBar = () => setVisibleS(!visibleS);

  const onDismissSnackBar = () => setVisibleS(false);
//   const copyToClipboard = async() => {
//     // Clipboard.setString('hello world');
//     Clipboard.setString(`key is : ${raw_secret_key}`);
//     setSnackMssg('Copied to clipboard');
//     onToggleSnackBar();
//   };
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: colors.yellowDark,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 30,
          }}>
          <Text style={{ color: '#fff' }}>Enable</Text>
          {'\n'}2 Factor Authentication
          {/* {'\n'}2 Factor Authentication OTP */}
        </Text>
      </View>
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
      <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 50, marginBottom: 30 }}>
        Download & Install an authenticator app{' '}
      </Text>
      <Image source={require('../../assets/gplay.png')} style={{width:'40%',height:50}} />

      <View style={styles.innerContainer}>
        <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 50, marginBottom: 30 }}>
          Tap QR Code
        </Text>
        <ImageBackground
          style={{ padding: 15 }}
          source={require('../../assets/qrShadow.png')}
          resizeMode="contain">
          {googleAuthUrl !== '' ? (
            <TouchableOpacity onPress={openGoogleAuth} style={{ alignItems: 'center', margin: 6 }}>
              <QRCode size={150} value={googleAuthUrl} />
            </TouchableOpacity>
          ) : (
            <Text style={{ color: '#fff' }}>cant make a d qr</Text>
           ) }
        </ImageBackground>

        <ImageBackground
          style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}
          source={require('../../assets/copyshadow.png')}
          resizeMode="stretch">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              width: '95%',
              padding: 10,
              position: 'relative',
            }}>
            <View>
              <Text selectable={true} style={{ color: '#fff', textAlign: 'center' }}>
                {raw_secret_key}
              </Text>
            </View>
            <Button
              style={{ position: 'absolute', right: '-14%', top: 20, zIndex: 10 }}
              labelStyle={{ fontSize: 22, lineHeight: 1 }}
            //   onPress={copyToClipboard}
              icon="content-copy"
              color="#6E6E6E"
            />
          </View>
        </ImageBackground>
      </View>


      <Button
        disabled={false}
        dark={false}
        style={styles.button}
        onPress={async() => {await AsyncStorage.setItem('raw_secret_key', raw_secret_key);
        navigation.navigate('TwoFactorOTPScreen', { formData });
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
        mode="contained" >
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  innerContainer: {
    // padding: 40,
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: colors.bgColor,
  },
  indicatorContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginHorizontal: 40,
    marginVertical: 50,
    width: 200,
  },
  rupee: {},
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 55,
    color: colors.yellowDark,
    fontWeight: '900',
    // lineHeight:70,
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  regularHeading3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'white',
  },
  button: {
    width: '80%',
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

export default TwoFactorAuthQR;
