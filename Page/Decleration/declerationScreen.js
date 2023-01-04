import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Pressable } from 'react-native'
import { Checkbox , Button} from 'react-native-paper'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native-web'
import { colors } from '../../src/constants'
import { useNavigation } from '@react-navigation/native'
export const DeclerationScreen = (props) => {
    const [checked1 ,setChecked1]=useState(false)
    const [checked2 ,setChecked2]=useState(false)
    const [checked3 ,setChecked3]=useState(false)
    const [disabled ,setDisabled]=useState(true)
    const navigation =useNavigation();
    useEffect(()=>
    {if (checked1 && checked2 && checked3) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [checked1, checked2, checked3])
    const handleAccept = async() => {
        console.log(props.route.params.formData)
        createAccoutDetail(props.route.params.formData);
      };
      const createAccoutDetail = async(formData) => {
        console.log('fd afte ec', formData);
        await axios
          .post(`https://www.proassetz.com/api/v1/user-registration/?referral_code=${formData.referral_code}`, {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            terms_and_condition: 1,
          })
          .then(function (response) {
            console.log(response);
            navigation.navigate('VerifyEmailScreen', { formData });
          })
          .catch(function (error) {
            console.log(error)
            console.log('====>', error.response.data);
            alert(JSON.stringify(error.response?.data?.message))
            
            // if(error.response?.data?.message?.email){
            //   // alert(JSON.stringify(error.response?.data?.message?.email[0]))
            //   setSnackMssg(JSON.stringify(error.response?.data?.message?.email[0]))
            //   onToggleSnackBar();
            // }else{
              
            //   setSnackMssg("Somethings went wrong....")
            //   onToggleSnackBar();
            // }
          });
      };  
  return (
    <View style={{display:'flex',flexDirection:'column',...DeclerationStyle.backGround}}>
        <View style={{...DeclerationStyle.backGround,display:'flex',flexDirection: 'row',height:'10%'}}>
          <Pressable>
            <Image style={DeclerationStyle.logoWidth}
                  source={require('../../assets/backButton.png')}
                  onPress={()=> navigation.navigate('LoginScreen')}
                  />
          </Pressable>
          <Text style={DeclerationStyle.AccountText}>Decleration</Text>
        </View>
        
            <ScrollView style={{ flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'self-start',paddingLeft:5,paddingTop:20 }}>
                            <View >
                            <Checkbox
                                status={checked1 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked1(!checked1);
                                    
                                }}
                                color={`${colors.yellowDark}`}
                                
                                style={{ lineHeight: 1, fontSize: 30,}}
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, marginHorizontal: 0}}>
                                    <Text
                                        style={{ color: '#fff', fontSize: 16, fontFamily: 'Roboto-SemiBold', textAlign: 'left',marginTop: 6, }}>
                                        I declare that I became acquainted {'\n'} with
                                        <Text
                                        style={{
                                            color: colors.yellowDark,
                                            textAlign: 'center',
                                            fontFamily: 'Roboto-ExtraBold',
                                            fontWeight: '600',
                                            fontSize: 16,
                                        }}>
                                        Privacy policy
                                        </Text>{''}
                                        for Indian users,
                                        <Text
                                        style={{
                                            color: colors.yellowDark,
                                            textAlign: 'center',
                                            fontFamily: 'Roboto-ExtraBold',
                                            fontWeight: '600',
                                            fontSize: 16,
                                        }}>{'\n'}
                                        Terms of use
                                        </Text>{''}
                                        and{' '}
                                        <Text
                                        style={{
                                            color: colors.yellowDark,
                                            textAlign: 'center',
                                            fontFamily: 'Roboto-ExtraBold',
                                            fontWeight: '600',
                                            fontSize: 16,
                                        }}>{' '}
                                        Terms of condition
                                        </Text>{'\n'}
                                        for Indian users.
                                    </Text>
                            </View>
                            </View>
                    <View style={{ flexDirection: 'row', alignItems: 'self-start',paddingLeft:5,paddingTop:20 }}>
                            <View >
                            <Checkbox
                                status={checked2 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked2(!checked2);
                                }}
                                color={`${colors.yellowDark}`}
                                
                                style={{ lineHeight: 1, fontSize: 30,}}
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, marginHorizontal: 0}}>
                            <Text
                                    style={{ color: '#fff', marginLeft: 0, fontSize: 16, fontFamily: 'Roboto-SemiBold', textAlign: 'left' }}>
                                    I consent to the processing of my
                                    personal{'\n'} data provided by me during
                                    registration{'\n'} and collected during the  use of{'\n'}
                                    <Text
                                    style={{
                                        color: colors.yellowDark,
                                        textAlign: 'center',
                                        fontFamily: 'Roboto-ExtraBold',
                                        fontWeight: '600',
                                        fontSize: 16,
                                    }}>
                                    proassetz.com
                                    </Text>
                                    , collected in
                                    order to{'\n'}  provide services offered on the Website,{'\n'} in particular the sale
                                    and purchase{'\n'} of Crypto Assets.
                                </Text>
                                </View>
                            </View>
                    <View style={{ flexDirection: 'row', alignItems: 'self-start',paddingLeft:5,paddingTop:20 }}>
                            <View >
                            <Checkbox
                                status={checked3 ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked3(!checked3);
                                }}
                                color={`${colors.yellowDark}`}
                                
                                style={{ lineHeight: 1, fontSize: 30,}}
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, marginHorizontal: 0}}>
                            <Text
                                    style={{ color: '#fff', marginLeft: 4, fontSize: 16, fontFamily: 'Nunito-SemiBold', textAlign: 'left' }}>
                                    I consent to the processing of my personal{"\n"} data in order to provide me with information{"\n"}  on the operation of 
                                    the platform, new {"\n"} functionalities of
                                    the website, amendments{"\n"} to the  regulations and other documents, i.e {"\n"}
                                    <Text
                                    style={{
                                        color: colors.yellowDark,
                                        textAlign: 'center',
                                        fontFamily: 'Nunito-ExtraBold',
                                        fontWeight: '600',
                                        fontSize: 16,
                                    }}>
                                    Privacy Policy
                                    </Text>{' '}
                                    or AML
                                </Text>
                                </View>
                            </View>                
            </ScrollView>
        <Button
        disabled={disabled}
        dark={false}
        style={disabled ? DeclerationStyle.disabledButton : DeclerationStyle.button}
        onPress={handleAccept}
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
          Accept
        </Text>
        </Button>

    </View>    
    
  )
}

const DeclerationStyle = StyleSheet.create({
    backGround:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#202020',
    },
    button: {
        width: '50%',
        backgroundColor: `${colors.yellowLg}`,
        paddingVertical: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 40,
        borderRadius: 10,
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
      marginRight:113,
    },
    disabledButton: {
        width: '50%',
        backgroundColor: 'white',
        paddingVertical: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 40,
        borderRadius: 10,
      },
  
  }) 