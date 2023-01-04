import { Formik } from 'formik';
import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native-web'
import { colors } from '../../src/constants'
import * as yup from 'yup'
import { Button } from 'react-native-paper';
import { Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const formSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });
      const navigation = useNavigation();
      const storeData = (user) => {
        try {
          AsyncStorage.setItem('Key', JSON.stringify(user))
        }
        catch (e) {
          console.log('Async error', e)
        }
      }
      const handleLogin = (formData) => {
        axios
          .post('https://www.proassetz.com/api/v1/user-login/', formData)
          .then(function (response) {
            console.log('response ==>', response.data);
            if (response?.data?.otp_type == 'google') {
                // user.email = formData.email
                // user.password = formData.password
                
                // navigation.navigate('TwoFactorOTP', { formData, response });
                // setUserData({ email: formData.email, password: formData.password })
                   storeData({ email: formData.email, password: formData.password });
                   alert(response.data.message);
              
                // navigation.navigate('EmailAuth', { formData, response });
                // navigation.navigate('VerifyEmail', { formData, response });
            } else if (response.data.otp_type == 'email') {
                storeData({ email: formData.email, password: formData.password });
                navigation.navigate('EmailAuthenticationScreen', { formData, response });
                }
          })
          .catch(function (error) {
            alert(error)
            const { message } = error.response.data;
            let errm;
            if (message.english) {
              errm = JSON.stringify(message.english);
            } else {
              errm = JSON.stringify(message);
            }
            console.log(errm);
            alert(error.response.data.message, 'Verify email if not verified');
            // setSnackMssg(`${errm}`);
            // onToggleSnackBar();
            // console.log(error);
          });
      };
  return (
    <View style={LoginStyle.outerContainer}>
        <View style={LoginStyle.innerView1}>
          <Image  
            style={LoginStyle.logoWidth}
            source={require('../../assets/logoBig.png')}
          />
        </View>
        <View style={LoginStyle.innerView2}>
            <View>
                <Text style={LoginStyle.regularHeading}>
                    Login
                </Text>
            </View>
            <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              console.log('login values', values);
            //   setemail(values.email);
            //   setpass(values.pass);
              handleLogin(values);
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
              <>
                <View style={[LoginStyle.inputWrapper]}>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={[LoginStyle.input, touched.email && errors.email ? { borderWidth: 1, borderColor: '#DC3030' } : {}]}
                    color="#fff"
                    value={values.email}
                    onChangeText={(val) => setFieldValue('email', val.trim())}
                    onBlur={handleBlur('email')}
                    placeholder=' Email ID'
                    theme={{ colors: { text: '#fff' } }}
                  // onChange={(val) => setval1(val)}
                  />
                </View>
                <Text style={{ color: '#DC3030', textAlign: 'left', marginLeft: 20, }}>{touched.email && errors.email}</Text>

                <View
                  style={{ ...LoginStyle.rowcon, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <View style={LoginStyle.inputWrapper2}>
                    <TextInput
                      mode="flat"
                      underlineColor="transparent"
                      activeUnderlineColor="transparent"
                      style={[LoginStyle.input2, touched.password && errors.password ? { borderWidth: 1, borderColor: '#DC3030' } : {}]}
                      color="#fff"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder=" Password"
                      theme={{ colors: { text: '#fff' } }}
                    //   onChange={(val) => setval2(val)}
                    />
                  </View>
                  <Button
                    // onPress={handleFingerPrint}
                    icon="fingerprint"
                    labelStyle={LoginStyle.lableStyle}
                    style={LoginStyle.buttomStyle}
                    color="#6E6E6E"
                  />
                </View>
                <Text style={{ color: '#DC3030', textAlign: 'left', marginLeft: 20, }}>{touched.password && errors.password}</Text>
                <View style={LoginStyle.rowcon}>
                  <TouchableOpacity onPress={() => { navigation.navigate('ForgotPasswordScreen') }}>
                    <Text
                      style={LoginStyle.textStyle}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>   
                  <View style={{ width: '50%' }}>
                    <Pressable style={LoginStyle.button} onPress={handleSubmit}>
                      <Text
                        style={LoginStyle.loginBtnStyle}>
                        Login
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={LoginStyle.innerView3}>

        </View>
    </View>
  )
}

const LoginStyle = StyleSheet.create({
    outerContainer:{
        flex:1,
        display:'flex',
        flexDirection:'Column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.bgColor,
    },
    loginBtnStyle:{
        textAlign: 'center',
        color: '#473200',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        fontWeight: '500',
    },
    textStyle:{
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 16,
    },
    buttomStyle:{
        borderRadius: 5,
        backgroundColor: '#3B3B3B',
        width: '20%',
        marginTop: 3,
        // padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 51,
    },
    lableStyle:{
        fontSize: 35,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    regularHeading: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 32,
        color: 'white',
        textAlign: 'left',
        width: '100%',
        marginLeft: 15,
      },
    innerView1:{
       display:'flex',
       flexDirection:'column',
       justifyContent: 'center',
       height:'35%',
       width:'100%'
    },
    innerView2:{
        height:'35%',
        width:'100%'
    },
    innerView3:{
        height:'29%',
        width:'100%'
    },
    logoWidth:{
        width: 249,
        height: 199,
        margin:'auto'
      },
      innerContainer: {
        padding: 40,
        flex: 2,

      },
      rowcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight:14
      },
      input: {
        backgroundColor: '#424040',
        color: '#fff',
        borderRadius: 5,
        height: 50,
        marginHorizontal: 10,
      },
      input2: {
        backgroundColor: '#424040',
        color: '#fff',
        borderRadius: 5,
        height: 50,
        width: '100%',
      },
      inputWrapper: {
        backgroundColor: 'transparent',
        marginTop: 10,
        padding: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
      },
      inputWrapper2: {
        backgroundColor: 'transparent',
        padding: 3,
        paddingLeft: 0,
        width: '80%',
        position: 'relative',
        left: -6,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      button: {
        width: '100%',
        borderRadius:10,
        backgroundColor: `${colors.yellowLg}`,
        paddingVertical: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20,
      }
})
export default LoginScreen