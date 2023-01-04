import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Image, View, StyleSheet, Text, TextInput,ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native-web'
import { colors } from '../../src/constants';
import { Button, Checkbox } from 'react-native-paper';
import { Pressable } from 'react-native';
import { CodeField ,useClearByFocusCell, useBlurOnFulfill,Cursor,isLastFilledCell} from 'react-native-confirmation-code-field';




const CELL_COUNT = 6;
export const EmailAuthentication=(props)=> {
  const navigation=useNavigation();
  const [value,setValue]=useState('')
  const [timerCount, setTimer] = React.useState(10);
  const [otpDone, setOtpDone] = useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleVerifyOtp = (otp) => {
    let reqBody = {
      ...props?.route?.params?.formData,
      email_otp: otp,
    };
    console.warn(...props?.route?.params?.formData,)
    console.log('make req with', reqBody);
    axios
      .post('https://www.proassetz.com/api/v1/user-login/', reqBody)
      .then(function (response) {
        console.log(response);
        if (response.data.otp_type === 'google') {
          let qrData = { ...response.data, ...reqBody };
          navigation.navigate('TwoFactorAuth', { qrData });
        }
      })
      .catch(function (error) {
        alert(error.response.data.message, 'Verify email if not verified');
        console.log(error);
      });
  };
  useEffect(()=>{
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    
    return () =>{ clearInterval(interval)};
  },[ ]);
  useEffect(()=>{
    if(timerCount===0){
      setDisabled(false)
    }
  });
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
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
        style={[EmailAuthenticationStyle.cell, isFocused && EmailAuthenticationStyle.focusCell]}
        onLayout={getCellOnLayout(index)}>
        {textChild}
      </Text>
    );
  };
  return (
    <View style={EmailAuthenticationStyle.outerContainer}>
        <View style={{...EmailAuthenticationStyle.backGround,display:'flex',flexDirection: 'row',height:'30%',justifyContent:'inherit',width:'100%'}}>
          <Pressable>
            <Image style={EmailAuthenticationStyle.logoWidth}
                  source={require('../../assets/backButton.png')}
                  onPress={()=> navigation.navigate('SplashScreen')}
                  />
          </Pressable>
          <Text style={EmailAuthenticationStyle.AccountText}>Email Authentication</Text>
          
        </View>
        <View style={EmailAuthenticationStyle.innerView2}>
            <View style={EmailAuthenticationStyle.otpStyle}>
              <Text style={EmailAuthenticationStyle.emailStyle}>
                  An OTP has been sent to {'\n'} your email
              </Text>
            </View>
        </View>
        <View style={EmailAuthenticationStyle.innerView3}>
              <View style={{display:'flex',flexDirection:'column'}}>
                <Text style={{ color: '#6E6E6E', textAlign: 'center', marginTop: 50 }}>Type your OTP</Text>
                <CodeField
                    ref={ref}
                    {...codeFieldProps}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={EmailAuthenticationStyle.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                   
                />
                <Text style={{ color: '#E29224', textAlign: 'center' }}>
                  0.{timerCount} <Text style={{ color: '#6E6E6E' }}>min</Text>
                </Text>
              </View>
        </View>
        <View style={EmailAuthenticationStyle.innerView4}>
            <Pressable
            style={EmailAuthenticationStyle.button}
            onPress={() => {
              if (otpDone) {
                
                handleVerifyOtp(value);
              } else {
                alert('OTP invalid');
              }
            }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Verify</Text>
          </Pressable>
              <Button
                        disabled={disabled}
                        dark={false}
                        style={disabled ? EmailAuthenticationStyle.resendDisabledButton : EmailAuthenticationStyle.resendButton}
                        // onPress={}
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
                          style={
                            disabled
                              ? {
                                fontSize: 20,
                                fontFamily: 'Nunito-SemiBold',
                                textAlign: 'center',
                                color: 'lightgray',
                                textTransform: 'capitalize',
                              }
                              : {
                                fontSize: 20,
                                fontFamily: 'Nunito-SemiBold',
                                textAlign: 'center',
                                textTransform: 'capitalize',
                                color: '#473200',
                              }
                          }>
                          Resend
                        </Text>
              </Button>
        </View>
    </View>
  );
}



 
const EmailAuthenticationStyle = StyleSheet.create({
  resendDisabledButton: {
    width: '50%',
    // backgroundColor: 'white',
    padding: 0,
    // height: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  resendButton: {
    width: '50%',
    alignSelf: 'stretch',
    // backgroundColor: `${colors.yellowDark}`,
    padding: 0,
    // height: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 10,
  },
  logoWidth:{
    width:23,
    height:23,
    marginRight:0,
    marginTop:0,
    marginLeft:-53
  },
  button: {
    width: 150,
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  otpStyle:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  emailStyle:{
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 18,
    textAlign:'center',
    lineHeight: 20,
    color: '#FFF6E0',
  },
  codeFieldRoot: { marginVertical: 20,marginHorizontal:20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 35,
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
  AccountText:{
    display:'flex',
    alignItems:'flex-start',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 28,
    lineHeight: 24,
    color: '#FFF6E0',
    marginLeft:0,
  },
  outerContainer:{
    flex:1,
    display:'flex',
    flexDirection:'Column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.bgColor,
  },
  innerView1:{
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    height:'30%',
    width:'100%'
  },
  innerView2:{
    height:'10%',
    width:'100%'
  },
  innerView3:{
    height:'30%',
    width:'100%'
  },
  innerView4:{
    height:'19%',
    width:'100%'
  }



})
