import { useNavigation } from '@react-navigation/native';
import React, { useEffect,useState } from 'react'
import { Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native-web';
import { colors } from '../../src/constants';
import { CreateAccountScreen } from '../Login/createAccountScreen';
import LoginScreen from '../LoginPage/LoginScreen';
import { Pressable } from 'react-native';


export function SplashScreen(){
  const [currStep, setCurrStep] = useState(0);
  useEffect(() => {
    renderStep(currStep);
  }, [currStep]);
  const goToLogin = () => {
    props.navigation.navigate('Login');
  };
  const renderStep = (index) => {
    switch (index) {
      case 0:
        return <Screen1 moveStep={setCurrStep} />;
      case 1:
        return <Screen2 moveStep={setCurrStep} />;
      case 2:
        return <Screen3 moveStep={setCurrStep} />;
      default:
        return <Screen3 moveStep={setCurrStep} nav={() => {goToLogin}} />;
    }
  };
  return(
    <View style={SplashStyle.container}>
       <Logo />
       {renderStep(currStep)}
       <PageDots index={currStep}/>
    </View>
   
  )
}
function Screen1({moveStep}){
  return(
    <View style={SplashStyle.innerContainer}>
         <Image style={{width: '30%', height: '30%'}} resizeMode='contain' source={require('../../assets/rupee.png')} />
         <Text style={{ ...SplashStyle.regularHeading, position: 'relative', top: '-2%' }}>
          Complete {'\n'}
              <Text style={SplashStyle.regularHeading2}>Your</Text>
              <Text style={SplashStyle.boldHeading}>
                {' '}
                KYC{'\n'}
                <Text style={SplashStyle.regularHeading2}>In </Text>2 Mins
                </Text>
          </Text>
        <TouchableOpacity onPress={() => moveStep(1)}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/next.png')} style={{ height: 70, width: 70 }} />
          </View>
        </TouchableOpacity>
</View>
  )
}
function Screen2({moveStep}){
  return(
    <View style={SplashStyle.innerContainer}>
         <Image style={{width: '30%', height: '30%'}} resizeMode='contain' source={require('../../assets/rupee.png')} />
         <Text style={{ ...SplashStyle.regularHeading, position: 'relative', top: '-2%' }}>
          Deposit 
              <Text style={SplashStyle.regularHeading2}></Text>
              <Text style={SplashStyle.boldHeading}>
                {' '}
                INR{'\n'}
                ProAssetz
                </Text>
          </Text>
        <TouchableOpacity onPress={() => moveStep(2)}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/next.png')} style={{ height: 70, width: 70 }} />
          </View>
        </TouchableOpacity>
</View>
  )
}
function Screen3() {
  const navigation = useNavigation();
  return (
    <View style={SplashStyle.innerContainer}>
      <Image style={{width: '30%', height: '30%'}} resizeMode='contain' source={require('../../assets/rupee.png')} />
      <Text style={SplashStyle.boldHeading}>
        Buy{' '}
        <Text style={{ ...SplashStyle.regularHeading, fontSize: 50, fontFamily: 'Monstserrat-Light' }}>
          &
        </Text>{' '}
        Sell{'\n'}
        <Text style={SplashStyle.regularHeading}>Crypto assets</Text>
      </Text>

      <Pressable style={SplashStyle.button} onPress={() => navigation.navigate('CreateAccountScreen')}>
        <Text
          style={SplashStyle.getStarted}>
          Get Started
        </Text>
      </Pressable>
      <Text
        style={SplashStyle.AlAct}>
        Already have an account ?
      </Text>
      <Pressable onPress={() => navigation.navigate('LoginScreen')}>
        <Text
          style={SplashStyle.login}>
          Login
        </Text>
      </Pressable>
    </View>
  );
}
function Logo() {
  return (
    <View>
      <Image source={require('../../assets/logo.png')} style={SplashStyle.logo} />
    </View>
  );
}
function PageDots({index}){
  return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80 }}>
    <View style={{...SplashStyle.dots,backgroundColor: index === 0 ? '#E29224' : '#473200',}}>  
    </View>
    <View style={{...SplashStyle.dots,backgroundColor: index === 1 ? '#E29224' : '#473200',}}>  
    </View>
    <View style={{...SplashStyle.dots,backgroundColor: index === 2 ? '#E29224' : '#473200',}}>  
    </View>
    </View>
  )
}
const SplashStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'center',
  },
  InlineBlock:{
    
  },
  dots:{
    width:15,
    height:15,
    borderRadius:'50%',
    marginBottom:20,
    marginLeft:20,
    display:'inline-block'
  },
  login:{
    color: `${colors.yellowLg}`,
    textAlign: 'center',
    fontFamily: 'Nunito-ExtraBold',
    fontWeight: '600',
    fontSize: 16,
  },
  AlAct:{
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
  getStarted:{
    textAlign: 'center',
    color: `${colors.yellowLg}`,
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    fontWeight: '500',
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'space-evenly',
  },
  backGround:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#202020',
  },
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 50,
    color: colors.yellowDark,
    fontStyle: 'normal',
    fontWeight: '900',
    // letterSpacing: 1,
  },
  logo: {
    marginHorizontal: 10,
    marginVertical: 30,
    width: 253,
    height: 38,
  },
  logoWidth:{
    width: 200,
    height: 200,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
    // fontWeight: '500'
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 32,
    color: 'white',
  },
})

