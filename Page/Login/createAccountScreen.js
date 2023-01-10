import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import React ,{useState}from 'react'
import { Image, View, StyleSheet, Text, TextInput,ScrollView, KeyboardAvoidingView, TouchableOpacity,} from 'react-native'
import { colors } from '../../src/constants';
import { Button, Checkbox } from 'react-native-paper';
import { Pressable } from 'react-native';



const formSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string('Last name is required').required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export const CreateAccountScreen=()=> {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const handleCreateAccount = (formData) => {
    navigation.navigate('DeclerationScreen', { formData });
  };
  return (
    <View style={{display:'flex',flexDirection:'column',...CreateAccountStyle.backGround}}>
        <View style={{...CreateAccountStyle.backGround,display:'flex',flexDirection: 'row',height:'10%'}}>
          <Pressable>
            <Image
                  style={CreateAccountStyle.logoWidth}
                  source={require('../../assets/backButton.png')}
                  onPress={()=> navigation.navigate('SplashScreen')}
            />
          </Pressable>
          <Text style={CreateAccountStyle.AccountText}>Create an Account</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: '',
            refferal_code: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {

            handleCreateAccount(values);
          }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue }) => (
          <View style={{...CreateAccountStyle.innerContainer}}>
            <ScrollView style={{paddingTop:20,flexGrow:0}}>
              <View
                    style={
                      touched.first_name && errors.first_name
                        ? { ...CreateAccountStyle.errorWrapper }
                        : { ...CreateAccountStyle.inputWrapper }
                    }>
                      <TextInput
                          mode="flat"
                          underlineColor="transparent"
                          activeUnderlineColor="transparent"
                          style={CreateAccountStyle.input}
                          color="#6E6E6E"
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          // label={'First Name'}
                          placeholder={'  First Name'}
                          theme={{ colors: { text: '#fff' } }}
                      />
              </View>
              <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5 }}>{touched.first_name && errors.first_name}</Text>
              <View
                  style={
                    touched.last_name && errors.last_name
                      ? { ...CreateAccountStyle.errorWrapper }
                      : { ...CreateAccountStyle.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={CreateAccountStyle.input}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    color="#6E6E6E"
                    placeholder={"  Last Name"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5}}>{touched.last_name && errors.last_name}</Text>
                <View
                  style={
                    touched.email && errors.email
                      ? { ...CreateAccountStyle.errorWrapper }
                      : { ...CreateAccountStyle.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={CreateAccountStyle.input}
                    color="#fff"
                    value={values.email}
                    onChangeText={(val) => setFieldValue('email', val.trim())}
                    onBlur={handleBlur('email')}
                    placeholder={"  Email ID"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5}}>{touched.email && errors.email}</Text>
                <View
                  style={
                    touched.password && errors.password
                      ? { ...CreateAccountStyle.errorWrapper }
                      : { ...CreateAccountStyle.inputWrapper }
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={CreateAccountStyle.input}
                    color="#fff"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={passwordVisible}
                    icon={
                      <TouchableOpacity onPress={()=>{
                        setPasswordVisible(!passwordVisible)
                      }}>
                        <Text>{passwordVisible ? 'Show' :"Hide"}</Text>
                      </TouchableOpacity>
                    }
                    iconPosition='Right'
                    placeholder={"  Password"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5  }}>{touched.password && errors.password}</Text>
                <View
                  style={
                    touched.confirm_password && errors.confirm_password
                      ? { ...CreateAccountStyle.errorWrapper,}
                      : { ...CreateAccountStyle.inputWrapper,}
                  }>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={CreateAccountStyle.input}
                    color="#fff"
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    placeholder={"  Confirm Password"}
                    secureTextEntry={passwordVisible}
                    icon={
                      <TouchableOpacity onPress={()=>{
                        setPasswordVisible(!passwordVisible)
                      }}>
                        <Text>{passwordVisible ? 'Show' :"Hide"}</Text>
                      </TouchableOpacity>
                    }
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
                <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5 }}>
                  {touched.confirm_password && errors.confirm_password}
                </Text>
                <View style={[CreateAccountStyle.inputWrapper, CreateAccountStyle.mb2]}>
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={CreateAccountStyle.input}
                    color="#fff"
                    onChangeText={handleChange('referral_code')}
                    onBlur={handleBlur('referral_code')}
                    placeholder={"  Refferal Code"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
            </ScrollView>
            <KeyboardAvoidingView  keyboardVerticalOffset={-550}>
                
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',paddingLeft:10, }}>
                  <View >
                   <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                         setChecked(!checked);
                         setDisabled(!disabled)
                      }}
                      color={`${colors.yellowDark}`}
                      
                      style={{ lineHeight: 1, fontSize: 30 }}
                    />
                   </View>
                   <View> 
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 4,
                          fontSize: 16,
                          fontFamily: 'Nunito-SemiBold',
                        }}>
                        I agree to Proassetz’s{' '}
                        <Text
                          style={{
                            color: `${colors.yellowDark}`,
                            fontFamily: 'Nunito-ExtraBold',
                            fontSize: 16,
                          }}>
                          Terms of Use
                        </Text>
                      </Text>
                  </View>
                </View>
               <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    disabled={disabled}
                    dark={false}
                    style={disabled ? CreateAccountStyle.disabledButton : CreateAccountStyle.button}
                    onPress={handleSubmit}
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
                      Create Account
                    </Text>
                  </Button>
                </View> 
            </KeyboardAvoidingView>
          </View>
        )}


        </Formik>
    </View>
  )
}



 
const CreateAccountStyle = StyleSheet.create({
  backGround:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#202020',
  },
  logoWidth:{
    width: 20,
    height: 20,
    marginRight:90
  },
  AccountText:{
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
    color: '#FFF6E0',
    marginRight:82,
  },
  container: {
    backgroundColor: colors.bgColor,
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingTop: 30,
  },
  disabledButton: {
    width: '50%',
    backgroundColor: 'white',
    padding: 0,
    height: 46,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  button: {
    width: '50%',
    alignSelf: 'stretch',
    backgroundColor: `${colors.yellowDark}`,
    padding: 0,
    height: 46,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#424040',
    color: '#ffffff',
    borderRadius: 5,
    height: 50,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    marginTop: 10,
  },
  mb2: {
    marginBottom: 10,
  },
  errorWrapper: {
    backgroundColor: 'transparent',
    margin: 'auto',
    width: '90%',
    borderColor: '#DC3030',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,

  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  innerContainer: {
    height: '90%',
    width: '100%',
    
  },


})
