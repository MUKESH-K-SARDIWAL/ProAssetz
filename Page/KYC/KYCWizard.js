import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text,  View } from 'react-native-web';
import { colors } from '../../src/constants';
import { Caption, Checkbox, Dialog, Menu, Subheading,TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
export function KYCWizard() {
    const[pageNumber,setpageNumber]=useState(2); 
    const [currStep, setCurrStep] = useState(2);
    const [headingIndex, setHeadingIndex] =useState(2)
    const [parentState, setParentHandlre] = useState({
            first_name:'',
            last_name: '',
            email: '',
            custom_user_id: '',
            date: '',
            document_No: '',
            address: '',
            phone:'',
            national_id: '',
            pincode: '',
            city: '',
            state: '',
            country: '',

    })

    const parentHandlre = (parentState) => {
      setParentHandlre(parentState)
      console.log(parentState)
    }

    useEffect(() => {
      renderStep(currStep);
    }, [currStep]);
    const renderStep = (index) => {
      switch (index) {
        case 0:
          return <UserForm1 moveStep={setCurrStep} currentIndex={setpageNumber} parentData={parentHandlre}/>;
        case 1:
          return <UserForm2 moveStep={setCurrStep} currentIndex={setpageNumber} myheading={setHeadingIndex} parentData={parentHandlre}/>;
        case 2:
          return <UserForm3 moveStep={setCurrStep} myheading={headingIndex} />;
        case 3:
          // return <UserForm3 moveStep={setCurrStep} />;
        case 4:
          // return <UserForm3 moveStep={setCurrStep} />;      
        
      }
    };
    return (

      <View style={{...KYCStyles.container}}>
        <Header position={pageNumber}/>
        <SubHeadingOrCapiton headingIndex={headingIndex}/>
        {renderStep(currStep)}
      </View>
      
    )
}
function SubHeadingOrCapiton({headingIndex}){
    console.log(headingIndex)
    return(
       <>
            <Subheading style={KYCStyles.sub}>
            {headingIndex === 0  ? 'Basic information' : 'Upload Document'}
            </Subheading>
            <Caption style={KYCStyles.caption}>
                {headingIndex === 0 
                ? 'Verify Your details as per your document'
                : 'Upload clear JPG/PNG Files upto 5MB'}
            </Caption>
       </>
    )
}
function Header({ position }) {
    return (
      <View style={KYCStyles.headerContainer}>
        <View style={KYCStyles.stepCon}>
          <View style={KYCStyles.stepWrapper}>
                <View style={position !== 0 ? KYCStyles.stepLineActive : KYCStyles.stepLine} />
                <View style={KYCStyles.roundShapeActive}></View>
                <Text style={KYCStyles.stepTextActive}>Personal Details</Text>
          </View>
          <View style={KYCStyles.stepWrapper}>
                <View style={position === 2 ? KYCStyles.stepLine2Active : KYCStyles.stepLine2} />
                <View style={position === 1 || position === 2 ? KYCStyles.roundShapeActive : KYCStyles.roundShape} />
                <Text style={position === 1 || position === 2 ? KYCStyles.stepTextActive : KYCStyles.stepText}>
                    KYC Details
                </Text>
          </View>
          <View style={KYCStyles.stepWrapper}>
                <View style={ position === 2 ? KYCStyles.roundShapeActive : KYCStyles.roundShape} />
                <Text style={position === 2 ? KYCStyles.stepTextActive : KYCStyles.stepText}>KYC Documents</Text>
          </View>
        </View>
      </View>
    );
  }
function UserForm1(props){
  
    const formSchema = yup.object({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        email: yup.string().required('Email is required'),
        custom_user_id:yup.string().required('Customr user id is required')
      });
    return(
        <View>
            <Formik
            initialValues={{
            first_name:'',
            last_name: '',
            email: '',
            custom_user_id: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
            console.log('sub', values);
            
            
            }}>
            {({ setValues, handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
             <>
                <ScrollView style={{paddingTop:60,flexGrow:0}}>
                <View
                        style={
                        touched.first_name && errors.first_name
                            ? { ...KYCStyles.errorWrapper }
                            : { ...KYCStyles.inputWrapper }
                        }>
                        <TextInput
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            style={KYCStyles.input}
                            color="#686868"
                            value={values.first_name}
                            placeholderTextColor={colors.darkgreytxt}
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
                        ? { ...KYCStyles.errorWrapper }
                        : { ...KYCStyles.inputWrapper }
                    }>
                    <TextInput
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        style={KYCStyles.input}
                        value={values.last_name}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        color="#686868"
                        placeholderTextColor={colors.darkgreytxt}
                        placeholder={"  Last Name"}
                        theme={{ colors: { text: '#fff' } }}
                    />
                    </View>
                    <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5}}>{touched.last_name && errors.last_name}</Text>
                    <View
                    style={
                        touched.email && errors.email
                        ? { ...KYCStyles.errorWrapper }
                        : { ...KYCStyles.inputWrapper }
                    }>
                    <TextInput
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        style={KYCStyles.input}
                        color="#686868"
                        value={values.email}
                        placeholderTextColor={colors.darkgreytxt}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder={"  Email ID"}
                        theme={{ colors: { text: '#fff' } }}
                    />
                    </View>
                    <Text style={{ color: '#DC3030',paddingLeft:20,paddingTop:5}}>{touched.email && errors.email}</Text>
                    <View style={[KYCStyles.inputWrapper, KYCStyles.mb2]}>
                    <TextInput
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        style={KYCStyles.input}
                        color="#686868"
                        value={values.custom_user_id}
                        placeholderTextColor={colors.darkgreytxt}
                        onChangeText={handleChange('custom_user_id')}
                        onBlur={handleBlur('custom_user_id')}
                        placeholder={"ProAsstez Id"}
                        theme={{ colors: { text: '#fff' } }}
                    />
                    </View>
                </ScrollView>
                <Button
                title={'Next'}
                style={KYCStyles.button}
               
                onPress={() => {props.currentIndex(1),props.moveStep(1),props.parentData(values)}}
             
                handleSubmit={handleSubmit}
                
                ><Text
                style={
                  {
                      fontSize: 20,
                      fontFamily: 'Nunito-SemiBold',
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      color: '#473200',
                    }
                }>
                Next
              </Text></Button>
          </>
        )}
      </Formik>
        </View>
    )
}
function UserForm2(props){
  const formSchema = yup.object({
    date: yup.string().required('Date of birth is required'),
    phone: yup.string().min(10, '10 Digits Required').max(10, '10 Digits Required').required('Phone no is required'),
    address: yup.string().required('Address is required'),
    national_id: yup.string().required('National ID is required'),
    pincode: yup.string().required('Pin code is required'),
    city: yup.string().required('City is required'),
    state: yup.string(),
    document_No:yup.string().required('Document no is required'),
    country: yup.string().required('country is required'),
  });
  // const [mode, setMode] = React.useState('date');
  // const [show, setShow] = React.useState(false);
  // const [date, setDate] = React.useState(new Date());
  const [selected, setSelected] = React.useState("");
  const data = [
      {key:'1', value:'India'},
      {key:'2', value:'Pakistan'},
      {key:'3', value:'Sri Lanka'},
      {key:'4', value:'Russia'},
      {key:'5', value:'Ukraine'},
      {key:'6', value:'New Zealand'},
      {key:'7', value:'China'},
      {key:'8', value:'Japan'},
  ]
  const [cons, setCons] = React.useState([]);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setValues({ ...values, date: currentDate });
  };
  React.useEffect(() => {
    axios
      .get('https://www.proassetz.com/api/v1/country-list/')
      .then(function (response) {
        let temp = response.data.map((el) => {
          return el.name;
        });
        setCons(temp);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }, []);
  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };
  // function formatDate(date) {
  //   var d = new Date(date),
  //     month = '' + (d.getMonth() + 1),
  //     day = '' + d.getDate(),
  //     year = d.getFullYear();

  //   if (month.length < 2) {
  //     month = '0' + month;
  //   }
  //   if (day.length < 2) {
  //     day = '0' + day;
  //   }

  //   return [year, month, day].join('-');
  // }
  // const [conSelected, setconSelected] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [visible1, setVisible1] = React.useState(false);

  const openMenu1 = () => setVisible1(true);

  const closeMenu1 = (c) => {
    setVisible1(false);
    setValues({ ...values, country: c });
    handleChange('country')(c);
    handleBlur('country');
  };
  return(
    <View style={KYCStyles.container}>
      <Formik
        initialValues={{
          date: '',
          document_No: '',
          address: '',
          phone:'',
          national_id: '',
          pincode: '',
          city: '',
          state: '',
          country: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          // console.log('sub', values);
          // sendBasicForm(values);
        }}>
        {({ setValues, handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
               {/* {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    dateFormat="day month year"
                    onChange={onChangeDate}
                  />
               )} */}
                <View 
                      style={
                        touched.date && errors.date
                          ? { ...KYCStyles.errorWrapper}
                          : { ...KYCStyles.inputWrapper,}
                      }
                >
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={KYCStyles.input}
                    value={values.date}
                    onChangeText={handleChange('date')}
                    onBlur={handleBlur('date')}
                    color="#686868"
                    placeholderTextColor={colors.darkgreytxt}
                    placeholder={"DD/MM/YYYY"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
             <Text style={{ color: 'crimson',paddingLeft:20  }}>{touched.date && errors.date}</Text>

             <View 
                      style={
                        touched.document_No && errors.document_No
                          ? { ...KYCStyles.errorWrapper}
                          : { ...KYCStyles.inputWrapper,}
                      }
                >
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={KYCStyles.input}
                    value={values.document_No}
                    onChangeText={handleChange('document_No')}
                    onBlur={handleBlur('document_No')}
                    color="#686868"
                    placeholderTextColor={colors.darkgreytxt}
                    placeholder={"Enter Document No"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
             <Text style={{ color: 'crimson',paddingLeft:20  }}>{touched.document_No && errors.document_No}</Text>
            
             <View style={{...KYCStyles.rowCon,}}>
                <View
                  style={{
                    width: '39%',
                    marginLeft:22,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    
                  }}>
                  {/* <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={
                      <Button
                        labelStyle={{ color: '#6E6E6E' }}
                        onPress={openMenu1}
                        icon={'menu-down'}
                        contentStyle={{
                          width: '100%',
                          flexDirection: 'row-reverse',
                          height: 50,
                          color: 'red',
                          borderRadius:5
                        }}
                        style={{
                          backgroundColor: '#424141',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          borderRadius:5
                        }}>
                        {conSelected === '' ? 'Select Country' : conSelected}
                      </Button>
                    }>
                    <Menu.Item
                      onPress={() => {
                        setconSelected('India');
                        closeMenu1('India');
                        // setTimeout(() => {
                        //   // closeMenu1('India');
                        // }, 10);
                      }}
                      title="India"
                    />
                  </Menu> */}
                  <SelectList 
                          setSelected={(val) => setSelected(val)} 
                          data={data} 
                          save="value"
                          onChangeText={handleChange('country')}
                          onBlur={handleBlur('country')}
                          contentStyle={{
                          width: '100%',
                          flexDirection: 'row-reverse',
                          height: 50,
                          color: 'red',
                          borderRadius:5
                          }}
                          boxStyles={{
                            width:'70%',
                            color:'#fff',
                             backgroundColor: '#424141',
                          }}
                          dropdownStyles={{
                            width:'70%',
                            color:'#fff',
                             backgroundColor: '#424141',
                          }}
                          disabledItemStyles={{
                             width:'70%',
                             color:'#fff',
                              backgroundColor: '#424141',
                          }}
                          inputStyles={{
                            width:'100%',
                            color:'#fff',
                             backgroundColor: '#424141',
                          }}
                          style={{
                           
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100% !important',
                            borderRadius:5
                          }}
                      />

                  <Text style={{ color: 'crimson' }}>{touched.country && errors.country}</Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    marginTop: -2,
                    marginRight: 14,
                    marginLeft: -7,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View style={KYCStyles.inputWrapper}>
                    <TextInput
                      mode="flat"
                      underlineColor="#424040"
                      activeUnderlineColor="#424040"
                      style={{ ...KYCStyles.input, top: 3 }}
                      color="#686868"
                      value={values.state}
                      onChangeText={handleChange('state')}
                      onBlur={handleBlur('state')}
                      placeholder={"Enter state"}
                      placeholderTextColor={colors.darkgreytxt}
                      theme={{ colors: { text: '#fff' } }}
                    />
                    <Text style={{ color: 'crimson' }}>{touched.state && errors.state}</Text>
                  </View>
                </View>
      
      
             </View>
             <View 
                    style={
                      touched.address && errors.address
                        ? { ...KYCStyles.errorWrapper}
                        : { ...KYCStyles.inputWrapper,}
                    }
                >
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={KYCStyles.input}
                    value={values.address}
                    placeholderTextColor={colors.darkgreytxt}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    color="#686868"
                    placeholder={"Enter Your Address"}
                    theme={{ colors: { text: '#fff' } }}
                  />
                </View>
             <Text style={{ color: 'crimson',paddingLeft:20  }}>{touched.address && errors.address}</Text>
             <View style={KYCStyles.rowCon}>
        <View
          style={{
            width: '48%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft:12
          }}>
          <View style={KYCStyles.inputWrapper}>
            <TextInput
              mode="flat"
              underlineColor="#424040"
              activeUnderlineColor="#424040"
              style={KYCStyles.input}
              color="#686868"
              value={values.city}
              placeholderTextColor={colors.darkgreytxt}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              placeholder={"Enter City"}
              theme={{ colors: { text: '#fff' } }}
            />
            <Text style={{ color: 'crimson' }}>{touched.city && errors.city}</Text>
          </View>
        </View>
        <View
          style={{
            width:' 47%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: -6,
            marginRight: '11px',
          }}>
          <View style={KYCStyles.inputWrapper}>
            <TextInput
              mode="flat"
              underlineColor="#424040"
              activeUnderlineColor="#424040"
              style={KYCStyles.input}
              color="#686868"
              value={values.pincode}
              placeholderTextColor={colors.darkgreytxt}
              keyboardType='phone-pad'
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              placeholder={"Enter Pin Code"}
              theme={{ colors: { text: '#fff' } }}
            />
            <Text style={{ color: 'crimson' }}>{touched.pincode && errors.pincode}</Text>
          </View>
        </View>
             </View>
             <View 
                      style={
                        touched.phone && errors.phone
                          ? { ...KYCStyles.errorWrapper}
                          : { ...KYCStyles.inputWrapper,}
                      }
                >
                  <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={KYCStyles.input}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    color="#686868"
                    placeholderTextColor={colors.darkgreytxt}
                    placeholder={"Enter Phone No"}
                    theme={{ colors: { text: '#fff' } }}
                  />
              </View>
             <Text style={{ color: 'crimson',paddingLeft:20  }}>{touched.phone && errors.phone}</Text>

             <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    // disabled={disabled}
                    dark={false}
                    style={KYCStyles.button}
                    onPress={() => {props.currentIndex(2),props.moveStep(2),handleSubmit,props.myheading(1),props.parentData(values)}}
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
                        {
                            fontSize: 20,
                            fontFamily: 'Nunito-SemiBold',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            color: '#473200',
                          }
                      }>
                     Next
                    </Text>
                  </Button>
                </View> 
          </>
      
        )}
      </Formik>
    </View>
  )
}
function UserForm3({moveStep,currentIndex,myheading}){
  const [selfie,setSelfie]=useState('');
  const [checked,setChecked]=useState(true);
  const [checked2,setChecked2]=useState(false);
  const [frontSide, setfrontSide] = useState('');
  const [backSide, setbackSide] = useState('');
  const [docAndSelfie, setdocAndSelfie] = useState('');
  const [disabled, setDisabled] =useState(true)
  const [currDoc, setCurrDoc] = React.useState(null);
  const [visible, setVisible] = React.useState(false);


const showDialog = () => setVisible(true);
const hideDialog = () => setVisible(false);
      const openDialog = (location) => {
        showDialog();
        setCurrDoc(location);
      };
  const formSchema = yup.object({
    selfie: yup.string().required('Upload selfie '),
    front_side: yup.string().required('Upload Front Side Image'),
    back_side: yup.string().email().required('Upload back Side Image' ),
    selfie_with_doc:yup.string().required('Upload Selfie with Document')
  });
  const takepicnow = (type, location) => {
     if (type === 'camera'){
       ImageCropPicker.openCamera({
         // cropping: true,
         // freeStyleCropEnabled: true,
       }).then((image) => {
         console.log(image);
         switch (location) {
           case 's':
             setSelfie(image.path);
             break;
           case 'df':
             setdocFront(image.path);
             break;
           case 'db':
             setdocBack(image.path);
             break;
           case 'ds':
             setdocAndSelfie(image.path);
             break;
         }
         hideDialog();
       });
     }
     if (type === 'gallery') {
      ImageCropPicker.openPicker({
         width: 300,
        height: 400,
         // cropping: true,
         // freeStyleCropEnabled: true,
       }).then((image) => {
         console.log(image);
         switch (location) {
           case 's':
             setSelfie(image.path);
             break;
           case 'df':
             setdocFront(image.path);
             break;
           case 'db':
             setdocBack(image.path);
             break;
           case 'ds':
             setdocAndSelfie(image.path);
             break;
         }
         hideDialog();
       });
     }
  };
      React.useEffect(() => {
        console.log(selfie)
        if (selfie !== '') {
          
          postPic('user_profile_image', selfie);

        }
      }, [selfie]);

      function postPic(name, file){
        console.log({ name, file }, 'payload');
        let fileName
        if(file!=null){
          fileName = file.split('/').pop();
        }
        
        var photo = {
          uri: file,
          type: 'image/jpeg',
          name: fileName,
        };
        var formData = new FormData();
        formData.append(name, photo);
        axios({
          method: 'POST',
          url: 'https://www.proassetz.com/api/v1/update-kyc-documents/',
          data: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return formData;
          },
        })
          .then(function (response) {
            console.log(response, 'pppp');
            areDocumentsUploaded();
          })
          .catch(function (error) {
            console.log(error.response);
            areDocumentsUploaded();
          }); 
    
        areDocumentsUploaded();
      };
      const areDocumentsUploaded = () => {
        if (
          selfie !== '' &&
          frontSide !== '' &&
          backSide !== '' &&
          docAndSelfie !== ''
        ) {
          setTimeout(() => {
            setAllDocsUploaded(!allDocsUploaded);
            setSnackMssg('All documents successfully uploaded');
            onToggleSnackBar();
          }, 100);
        } else {
          // setAllDocsUploaded(false);
        }
      };
  return(
    <View style ={KYCStyles.container}>
      <Formik
            initialValues={{
              selfie:'',
              front_side:'',
              back_side:'',
              selfie_with_doc:''
            }}
           validationSchema={formSchema}
            onSubmit={(values) => {
            console.log('sub', values);
            sendBasicForm(values);
           }}>
            {({ setValues, handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                <ScrollView style={{ marginTop: 10 }}>
                <View style={{ ...KYCStyles.inputWrapper, justifyContent: 'space-between',position:'relative' }}>
                    {
                      selfie !== '' ? (
                          <Image
                          source={{selfie}}
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
                    style={{ ...KYCStyles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#686868"
                    onChangeText={handleChange('selfie')}
                    onBlur={handleBlur('selfie')}
                    showSoftInputOnFocus={false}
                    placeholder={"Upload Selfie"}
                    placeholderTextColor={colors.darkgreytxt}
                    onFocus={() => openDialog('s')}
                    
                />
                { 
                selfie !== '' ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.selfie && errors.selfie}</Text>
                 <Caption style={KYCStyles.caption}>Select Document Type to upload</Caption>
                 <View style={KYCStyles.rowCon}>
                      <View
                        style={{
                          width: '50%',
                          marginLeft:17,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          uncheckedColor="#6E6E6E"
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked);
                            setChecked2(!checked2);
                          }}
                        />
                        <Text style={{ color: '#6E6E6E', marginLeft: 4 }}>Passport</Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          marginLeft:17,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          uncheckedColor="#6E6E6E"
                          status={checked2 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked2(!checked2);
                            setChecked(!checked);
                          }}
                        />
                        <Text style={{ color: '#6E6E6E', marginLeft: 4 }}>Aadhar Card</Text>
                      </View>
                  </View>

                <View style={{ ...KYCStyles.inputWrapper, justifyContent: 'space-between',position:'relative' }}>
                    {
                      frontSide !== '' ? (
                          <Image
                          source={{frontSide}}
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
                    style={{ ...KYCStyles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#fff"
                    onChangeText={handleChange('front_side')}
                    onBlur={handleBlur('front_side')}
                    showSoftInputOnFocus={false}
                    placeholder={"Upload Document Front"}
                    placeholderTextColor={colors.darkgreytxt}
                    
                />
                { 
                frontSide !== '' ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.frontSide && errors.frontSide}</Text>
                <View style={{ ...KYCStyles.inputWrapper, justifyContent: 'space-between',position:'relative',marginTop:25 }}>
                  {
                      backSide !== '' ? (
                          <Image
                          source={{backSide}}
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
                    style={{ ...KYCStyles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#fff"
                    onChangeText={handleChange('backSide')}
                    onBlur={handleBlur('backSide')}
                    showSoftInputOnFocus={false}
                    placeholder={"Upload Document Back"}
                    placeholderTextColor={colors.darkgreytxt}
                    
                />
                { 
                backSide !== '' ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.back_side && errors.back_side}</Text>
                <Subheading style={{...KYCStyles.sub,marginTop:15}}>Upload Document</Subheading>
                <Caption style={KYCStyles.caption}>Your details as it appears on your documents</Caption>
                <View style={{ ...KYCStyles.inputWrapper, justifyContent: 'space-between',position:'relative',marginTop:25 }}>
                  {
                      docAndSelfie !== '' ? (
                          <Image
                          source={{docAndSelfie}}
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
                    style={{ ...KYCStyles.input, marginVertical: 5, zIndex:1, paddingLeft:30}}
                    color="#fff"
                    onChangeText={handleChange('docAndSelfie')}
                    onBlur={handleBlur('docAndSelfie')}
                    showSoftInputOnFocus={false}
                    placeholder={"Upload Document Back"}
                    placeholderTextColor={colors.darkgreytxt}
                    
                />
                { 
                docAndSelfie !== '' ? (
                  <View style={{backgroundColor:'green', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                ):(
                  <View style={{backgroundColor:'#6E6E6E', width:25,height:25,borderRadius:25,position:'absolute',top:'30%', left:'89%',zIndex:11,}}></View>
                )
                }
                </View>
                <Text style={{ color: 'red' }}>{touched.docAndSelfie && errors.docAndSelfie}</Text>


                <Button
                        disabled={disabled}
                        dark={false}
                        style={disabled ? KYCStyles.disabledButton : KYCStyles.button}
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
                          Submit
                        </Text>
              </Button>
                </ScrollView>
                
            )}
      </Formik>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Mode</Dialog.Title>
        <Dialog.Content>
          <Text>Select an option</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => takepicnow('gallery', currDoc)}>Gallery</Button>
          <Button onPress={() => takepicnow('camera', currDoc)}>Camera</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}


const KYCStyles = StyleSheet.create({
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