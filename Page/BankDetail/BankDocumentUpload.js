import { ScrollView, StyleSheet, Text, View,Button,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../src/constants';
import { Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { Caption, Dialog, Snackbar,Subheading,TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const formSchema = yup.object({
    
  });
  function StyledText({ labelText }) {
    return <Text style={{ color: '#6E6E6E', }}>{labelText}</Text>;
  }

export const BankDocumentUpload=(props)=>{
  console.log(props?.route?.params?.prevFormvalues)
  const prevFormvalues = _.cloneDeep(props?.route?.params?.prevFormvalues);
  
  const [panCard, setPanCard] = React.useState(null);
  const [cancelCheque, setCancelCheque] = useState(null);
  const [currDoc, setCurrDoc] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const [token, setToken] = React.useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzU5MDY0OTcsInVzZXJfaWQiOjEyOTUsImVtYWlsIjoiOWt1bWFybXVrZXNoOUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjlrdW1hcm11a2VzaDlAZ21haWwuY29tIn0.N07o6tc2bBeEBu1JxOypvi68Sq6_plBlQ6Z6I7NkS4g');
//   const navigation = useNavigation();
  // const getAuthState = async () => {
  //   console.log('getAIthAStatge');
  //   try {
  //     const authDataString = await AsyncStorage.getItem('auth');
  //     const authData = JSON.parse(authDataString || {});
  //     console.log(authData);
  //     setToken(authData.token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const hideDialog = () => setVisible(false);

  const openDialog = (location) => {
    showDialog();
    setCurrDoc(location);
  };
  const submitDataOfBank=(...props)=>{
    
 
    function convertBase64ToBlob(base64Image) {
      // Split into two parts
      const parts = base64Image.split(';base64,');
    
      // Hold the content type
      const imageType = parts[0].split(':')[1];
    
      // Decode Base64 string
      const decodedData = window.atob(parts[1]);
    
      // Create UNIT8ARRAY of size same as row data length
      const uInt8Array = new Uint8Array(decodedData.length);
    
      // Insert all character code into uInt8Array
      for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
      }
    
      // Return BLOB image after conversion
      return new Blob([uInt8Array], { type: imageType });
    }
    const panCard=convertBase64ToBlob(props[0])
    
    const cancelCheque=convertBase64ToBlob(props[1])
    
    
    const formData=new FormData();
    formData.append('account_type',props[2].account_type)
    formData.append('bank_account_number',props[2].bank_account_number)
    formData.append('bank_name',props[2].bank_name)
    formData.append('branch_name',props[2].branch_name)
    formData.append('confirm_bank',props[2].confirm_bank)
    formData.append('ifsc_code',props[2].ifsc_code)
    formData.append('mobile_number',props[2].mobile_number)
    formData.append('upi_address',props[2].upi_address)
    formData.append('pan_number','242893447')
    formData.append('pan_image',panCard,'pancardimg.png')
    formData.append('cancel_cheque',cancelCheque,'cheque.png')
    // formData.append("picture",myBlobImage,'AvatarImgName.jpg');
    axios
    .post('https://www.proassetz.com/api/v1/user-fiat-request/INR/',
      formData,{
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response)=>{
      console.log('response',response.data)
    })
    .catch((error)=>{
      console.log('error',error)
    })
  }
  const pickImage = async (type,location) => {
    console.log(type,location)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(location=='cancelCheque'){
        if (!result.canceled) {
            setCancelCheque(result.assets[0].uri);
        }
    }
    if(location=='panCard'){
        if (!result.canceled) {
            setPanCard(result.assets[0].uri);
        }
    }
    hideDialog();
  };


    return(
        <View style ={styles.container}>
            <Text style={styles.heading}>Almost Done</Text>
      <Formik
            initialValues={{
              ...prevFormvalues,
              
              // panCard:(
              //   (panCard ==null) ? '':panCard
              // ),
              // cancelCheque:(
              //   (cancelCheque ==null) ? '':cancelCheque
              // ),
            }}
           validationSchema={formSchema}
            onSubmit={(values) => {
            console.log('subtuiitetui', values);
            // sendBasicForm(values);
            submitDataOfBank(panCard,cancelCheque,values)
           }}>
            {({ setValues, handleChange, handleBlur, handleSubmit, values, touched, errors,isValid }) => (
                <ScrollView style={{ marginTop: 10 }}>
                    <Text></Text>
                    <Subheading style={styles.sub}>Upload Your Pan Card</Subheading>
                    <Caption style={styles.caption}>Upload clear JPG/PNG Files upto 5MB</Caption>
                <View style={{ ...styles.inputWrapper, justifyContent: 'space-between',position:'relative' }}>
                    {
                      panCard !== null ? (
                          <Image
                          source={{uri:panCard}}
                          style={{
                            borderRadius: 0,
                            width: 40,
                            height: 40,
                            borderWidth: 2,
                            borderColor:'#424040',
                            top:'18%',
                            zIndex:10,
                            position:'absolute'
                            }}
                          />
                        ) : (
                        <Image
                          source={require('../../assets/user.png')}
                          style={{
                            borderRadius: 0,
                            width: 40,
                            height: 40,
                            borderWidth: 2,
                            borderColor:'#424040',
                            top:'18%',
                            zIndex:10,
                            position:'absolute'
                            }}
                          />
                      )
                    }
                <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={{ ...styles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#686868"
                    onChangeText={handleChange('panCard')}
                    onBlur={handleBlur('panCard')}
                    // values={(panCard ==null) ? '':panCard}
                    showSoftInputOnFocus={false}
                    onFocus={() => openDialog('panCard')}
                    placeholder={"Upload panCard"}
                    label={<StyledText labelText="Upload Document Front" />}
                    placeholderTextColor={colors.darkgreytxt}
                    
                />
                { 
                panCard !== null ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.panCard && errors.panCard}</Text>
                
                <Subheading style={styles.sub}>Upload a copy of a Cancel Cheque</Subheading>
                 <Caption style={styles.caption}>Upload clear JPG/PNG Files upto 5MB</Caption>

                <View style={{ ...styles.inputWrapper, justifyContent: 'space-between',position:'relative',marginTop:25 }}>
                  {
                      cancelCheque !== null ? (
                          <Image
                          source={{ uri: cancelCheque }}
                          style={{
                            borderRadius: 0,
                            width: 40,
                            height: 40,
                            borderWidth: 2,
                            borderColor:'#424040',
                            top:'18%',
                            zIndex:10,
                            position:'absolute'
                            }}
                          />
                        ) : (
                        <Image
                          source={require('../../assets/driving-license.png')}
                          style={{
                            borderRadius: 0,
                            width: 40,
                            height: 40,
                            borderWidth: 2,
                            borderColor:'#424040',
                            top:'18%',
                            zIndex:10,
                            position:'absolute'
                            }}
                          />
                      )
                    }
                <TextInput
                    mode="flat"
                    underlineColor="#424040"
                    activeUnderlineColor="#424040"
                    style={{ ...styles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#fff"
                    // value={(cancelCheque ==null) ? '':cancelCheque}
                    onChangeText={handleChange('cancelCheque')}
                    onBlur={()=>{handleBlur('cancelCheque')}}
                    onFocus={() => openDialog('cancelCheque')}
                    // onBlur={()=>pickImage('cancelCheque')}
                    showSoftInputOnFocus={false}
                    placeholder={"Upload Document Back"}
                    placeholderTextColor={colors.darkgreytxt}
                    
                />
                { 
                cancelCheque !== null ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.back_side && errors.back_side}</Text>

                <View style={{width:'87%',margin:'auto',marginTop:'77%', marginBottom:"8%"}}>
                            <Button
                                disabled={((cancelCheque == null) || (panCard == null))}
                                style={styles.button}
                                contentStyle={{ paddingVertical: 10 }}
                                color={colors.darkOrange}
                                onPress={handleSubmit}
                                mode="contained"
                                title='Submit'
                            />
                        </View>
              
                </ScrollView>
                
            )}
      </Formik>
      <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Mode</Dialog.Title>
                <Dialog.Content>
                  <Text>Select an option</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => pickImage('gallery', currDoc)} title={'Gallery'}/>
                  <Button onPress={() => pickImage('camera', currDoc)} title={'Camera'}/>
                </Dialog.Actions>
              </Dialog>
    </View>
    )
}


const styles = StyleSheet.create({
    // inputWrapper: {
    //   backgroundColor: 'transparent',
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    //   width: '90%',
    //   marginTop: 10,
    // },
    // mb2: {
    //   marginBottom: 10,
    // },
    // errorWrapper: {
    //   backgroundColor: 'transparent',
    //   margin: 'auto',
    //   width: '90%',
    //   borderColor: '#DC3030',
    //   borderWidth: 1,
    //   borderRadius: 5,
    //   marginTop: 10,
  
    // },
      container: {
        backgroundColor: colors.bgColor,
        flex: 1,
        justifyContent: 'space-between',
      },
      formContainer: {
        padding: 10,
      },
      heading:{
        marginTop:10,
        textAlign:'center',    
        fontWeight:'bold',
        fontSize: 20,
        lineHeight:24,
        color: '#FFF6E0',
    },
      rowCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // marginBottom: 15,
      },
      headerContainer: {
        padding: 20,
      },
      sub: {
        
        color: 'white',
        // fontStyle: 'bold',
        fontWeight: '700',
        fontSize: 16,
        marginLeft:23
      },
      caption: {
        
        color: '#6E6E6E',
        fontSize: 13,
      //   margin: 0,
        marginLeft:23
      },
      stepCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    
        alignItems: 'center',
      },
      stepLine: {
        height: 4,
        width: '110%',
        backgroundColor: '#424141',
        position: 'absolute',
        top: '17%',
        left: '60%',
      },
      stepLineActive: {
        height: 4,
        width: '110%',
        backgroundColor: '#E29224',
        position: 'absolute',
        top: '17%',
        left: '60%',
      },
      stepLine2: {
        height: 4,
        width: '150%',
        backgroundColor: '#424141',
        position: 'absolute',
        top: '17%',
        left: '60%',
      },
      stepLine2Active: {
        height: 4,
        width: '150%',
        backgroundColor: '#E29224',
        position: 'absolute',
        top: '17%',
        left: '60%',
      },
      stepWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
      roundShape: {
        height: 20,
        width: 20,
        borderRadius: 100,
        backgroundColor: '#424141',
        marginBottom: 8,
      },
      roundShapeActive: {
        height: 20,
        width: 20,
        borderRadius: 100,
        backgroundColor: '#E29224',
        marginBottom: 8,
      },
      stepText: {
        textAlign: 'center',
        color: '#424141',
      },
      stepTextActive: {
        textAlign: 'center',
        color: '#E29224',
      },
      button: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20,
        borderRadius: 10,
      },
      input: {
        backgroundColor: '#424040',
        color: '#686868',
        borderRadius: 5,
        height: 50,
      },
      inputWrapper: {
        backgroundColor: 'transparent',
        // marginVertical: 15,
        padding: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        marginTop: 8,
      },
      errorWrapper: {
        backgroundColor: 'transparent',
        // marginVertical: 15,
        padding: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        borderColor: 'red',
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 8,
      },
      container: {
          backgroundColor: colors.bgColor,
          justifyContent: 'space-between',
          paddingBottom:0,
        },
        disabledButton: {
          width: '50%',
          backgroundColor: 'white',
          padding: 0,
          height: 46,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom:6,
          marginTop: 10,
          borderRadius: 10,
          alignSelf: 'stretch',
        },
        Submitbutton: {
          width: '50%',
          alignSelf: 'stretch',
          backgroundColor: `${colors.yellowDark}`,
          padding: 0,
          height: 46,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 6,
          marginBottom:27,
          borderRadius: 10,
        },
        button: {
          width: '50%',
          alignSelf: 'stretch',
          backgroundColor: `${colors.yellowDark}`,
          padding: 0,
          height: 46,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 97,
          marginBottom:27,
          borderRadius: 10,
          
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
    });