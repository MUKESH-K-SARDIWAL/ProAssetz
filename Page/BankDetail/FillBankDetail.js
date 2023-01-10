import { ScrollView, StyleSheet, Text, View,Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../src/constants';
import { Formik } from 'formik';
import * as yup from 'yup'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { values } from 'lodash';

function StyledText({ labelText }) {
  return <Text style={{ color: '#6E6E6E', }}>{labelText}</Text>;
}
const FillBankDetail = () => {

  const formSchema =yup.object({
    bank_name: yup.string().matches(/^[a-zA-Z]{2,40}/, 'Enter name in words')
    .required('Bank name is required'),
    ifsc_code:yup.string().required('IFSC code is reqiored').matches(/^(?=.*[A-Z])(?=.*[0-9])/,' IFSC code contain capital latter and Number'),
    bank_account_number:yup.string().required('Account number is required').matches(/^(?=.*[0-9])/,'Must be in Number'),
    confirm_bank:yup.string().required('Confirm your Account').oneOf([yup.ref('bank_account_number'), null], 'Account no must match').matches(/^(?=.*[0-9])/,'Must be in Number'),
    mobile_number:yup.string().matches(/(99)(\d){8}\b/, 'Number Required From 99').required('Mobile number required'),
    upi_address:yup.string().required('UPI address required'),
    account_type:yup.string().required('Enter account type'),
  })  
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Complete your Bank Details</Text>
        <Formik
            initialValues={{
              
                ifsc_code: '',
                bank_name: '',
                bank_account_number: '',
                confirm_bank: '',
                mobile_number: '',
                branch_name: '',
                upi_address: '',
                account_type: '',

            }}
            enableReinitialize={true}
            validationSchema={formSchema}
            onSubmit={(values) => {
                
            console.log('bank form', values);
            navigation.navigate('BankDetailsConfirmScreen', { values });
            }}>
            {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            setValues,
            setFieldValue,
            isValid
            }) => (
                    <View style={styles.container}>
                        <BankDetailsForm
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        touched={touched}
                        errors={errors}
                        />
                        <View style={{width:'95%',margin:'auto'}}>
                            <Button
                                disabled={!isValid}
                                style={styles.button}
                                contentStyle={{ paddingVertical: 10 }}
                                color={colors.darkOrange}
                                onPress={handleSubmit}
                                mode="contained"
                                title='Next'
                            />
                        </View>
                        
                        
                        
                    </View>
            )}
        </Formik>
    </View>
  )
}

const BankDetailsForm=({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              touched,
              errors, 
            })=>{
                return (
                    <ScrollView 
                      style={{ marginTop: 10 }}
                      contentContainerStyle={{justifyContent:'space-evenly'}}>
                       <View style={styles.inputWrapper}>
                                <View style={styles.rowCon}>
                                <View
                                    style={{
                                    width: '48%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    }}>
                                    <View style={styles.inputWrapper}>
                                    <TextInput
                                        mode="flat"
                                        underlineColor="#424040"
                                        activeUnderlineColor="#424040"
                                        style={{...styles.input,paddingLeft:10}}
                                        color="#fff !important"
                                        onChangeText={handleChange('ifsc_code')}
                                        value={values.ifsc_code}
                                        onBlur={handleBlur('ifsc_code')}
                                        label={<StyledText labelText="IFSC Code" />}
                                        // placeholder={"IFSC Code"}
                                        // placeholderTextColor={colors.darkgreytxt}
                                        // theme={{ colors: { text: '#fff' } }}
                                    />
                                    <Text style={{ color: 'crimson' }}>{touched.ifsc_code && errors.ifsc_code}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    width: '48%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    }}>
                                    <View style={styles.inputWrapper}>
                                    <TextInput
                                        mode="flat"
                                        underlineColor="#424040"
                                        activeUnderlineColor="#424040"
                                        style={{...styles.input,paddingLeft:10,color:'white'}}
                                        color="#fff !important"
                                        onChangeText={handleChange('bank_name')}
                                        onBlur={handleBlur('bank_name')}
                                        label={<StyledText labelText="Bank Name" />}
                                        value={values.bank_name}
                                        // placeholder={"Bank Name"}
                                        // placeholderTextColor={colors.darkgreytxt}
                                        // theme={{ colors: { text: '#fff' } }}
                                    />
                                    <Text style={{ color: 'crimson' }}>{touched.bank_name && errors.bank_name}</Text>
                                    </View>
                                </View>
                                </View>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        mode="flat"
                                        underlineColor="#424040"
                                        activeUnderlineColor="#424040"
                                        style={{...styles.input,paddingLeft:10}}
                                        color="#fff !important"
                                        // placeholderTextColor={colors.darkgreytxt}
                                        onChangeText={handleChange('bank_account_number')}
                                        label={<StyledText labelText="Bank Account No" />}
                                        value={values.bank_account_number}
                                        onBlur={handleBlur('bank_account_number')}
                                        // placeholder={"Bank Account No"}
                                        // theme={{ colors: { text: '#fff' } }}
                                    />
                                </View>
                                <Text style={{ color: 'crimson' }}>
                                    {touched.bank_account_number && errors.bank_account_number}
                                </Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                    mode="flat"
                                    underlineColor="#424040"
                                    activeUnderlineColor="#424040"
                                    style={{...styles.input,paddingLeft:10}}
                                    color="#fff !important"
                                    // placeholderTextColor={colors.darkgreytxt}
                                    value={values.confirm_bank}
                                    onChangeText={handleChange('confirm_bank')}
                                    label={<StyledText labelText="Confirm Bank Account No" />}
                                    onBlur={handleBlur('confirm_bank')}
                                    // placeholder={"Confirm Bank Account No"}
                                    // theme={{ colors: { text: '#fff' } }}
                                    />
                                </View>
                                <Text style={{ color: 'crimson' }}>{touched.confirm_bank && errors.confirm_bank}</Text>
                                <View style={styles.rowCon}>
                                    <View
                                    style={{
                                        width: '48%',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                        mode="flat"
                                        underlineColor="#424040"
                                        activeUnderlineColor="#424040"
                                        style={{...styles.input,paddingLeft:10}}
                                        color="#fff !important"
                                        // placeholderTextColor={colors.darkgreytxt}
                                        onChangeText={handleChange('branch_name')}
                                        value={values.branch_name}
                                        label={<StyledText labelText="Branch Name" />}
                                        onBlur={handleBlur('branch_name')}
                                        // placeholder={"Branch Name"}
                                        // theme={{ colors: { text: '#fff' } }}
                                        />
                                        <Text style={{ color: 'crimson' }}>{touched.branch_name && errors.branch_name}</Text>
                                    </View>
                                    </View>
                                    <View
                                    style={{
                                        width: '48%',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                    }}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                        mode="flat"
                                        underlineColor="#424040"
                                        activeUnderlineColor="#424040"
                                        style={{...styles.input,paddingLeft:10}}
                                        color="#fff !important"
                                        // placeholderTextColor={colors.darkgreytxt}
                                        onChangeText={handleChange('account_type')}
                                        onBlur={handleBlur('account_type')}
                                        // placeholder={"Account Type"}
                                        label={<StyledText labelText="Account Type" />}
                                        value={values.account_type}
                                        // theme={{colors:{text: '#fff'}}}
                                        />
                                        <Text style={{ color: 'crimson' }}>{touched.account_type && errors.account_type}</Text>
                                    </View>
                                    </View>
                                </View>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                    mode="flat"
                                    underlineColor="#424040"
                                    activeUnderlineColor="#424040"
                                    style={{...styles.input,paddingLeft:10}}
                                    color="#fff !important"
                                    // placeholderTextColor={colors.darkgreytxt}
                                    onChangeText={handleChange('mobile_number')}
                                    onBlur={handleBlur('mobile_number')}
                                    label={<StyledText labelText="Mobile Number" />}
                                    value={values.mobile_number}
                                    // placeholder={"Mobile No"}
                                    // theme={{ colors: { text: '#fff' } }}
                                    />
                                </View>
                                <Text style={{ color: 'crimson' }}>{touched.mobile_number && errors.mobile_number}</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                    mode="flat"
                                    underlineColor="#424040"
                                    activeUnderlineColor="#424040"
                                    style={{...styles.input,paddingLeft:10}}
                                    color="#fff !important"
                                    // placeholderTextColor={colors.darkgreytxt}
                                    onChangeText={handleChange('bank_name')}
                                    onBlur={handleBlur('bank_name')}
                                    label={<StyledText labelText="Name as on Bank Account" />}
                                    value={values.bank_name}
                                    // placeholder={"Name as on Bank Account"}
                                    // theme={{ colors: { text: '#fff' } }}
                                    />
                                </View>
                                <Text style={{ color: 'crimson' }}>{touched.bank_name && errors.bank_name}</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                    mode="flat"
                                    underlineColor="#424040"
                                    activeUnderlineColor="#424040"
                                    style={{...styles.input,paddingLeft:10}}
                                    color="#fff !important"
                                    // placeholderTextColor={colors.darkgreytxt}
                                    onChangeText={handleChange('upi_address')}
                                    value={values.upi_address}
                                    label={<StyledText labelText="UPI Address with Bank" />}
                                    onBlur={handleBlur('upi_address')}
                                    // placeholder={"UPI Address with Bank"}
                                    // theme={{colors: { text: '#fff' }}}
                                    />
                                </View>
                                <Text style={{ color: 'crimson' }}>{touched.upi_address && errors.upi_address}</Text>
                       </View>   
                    </ScrollView>
                )
            }

export default FillBankDetail

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.bgColor,
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
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
      alignItems: 'center',
      // marginBottom: 15,
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
    headerContainer: {
      padding: 20,
    },
    sub: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    caption: {
      color: '#6E6E6E',
      fontSize: 13,
      margin: 0,
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
      width: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 20,
      borderRadius: 10,
    },
    input: {
      // backgroundColor: '#424040's,
      color: colors.white,
      borderRadius: 5,
      height: 55,
      marginTop:10
    },
    inputWrapper: {
      backgroundColor: 'transparent',
      padding: 3,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },
    errorWrapper: {
      backgroundColor: 'transparent',
      padding: 3,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      borderColor: 'red',
      borderWidth: 0,
      borderRadius: 5,
    },
  });