import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable,} from 'react-native';
import { Text, View, StyleSheet  } from 'react-native-web';
import { colors } from '../../src/constants';

export function KYCWelcome() {
  const navigation =useNavigation();
  return (
    <View
     style={KYCStyle.container}>
      <View style={KYCStyle.innerContainer}>
        
        <View style={{paddingLeft:25}}>
          <Text style={KYCStyle.regularHeading}>
            Complete Your{'\n'}
           
            <Text style={KYCStyle.boldHeading}>KYC</Text>
          </Text>
          <View style={{ position:'relative',top:30 }}>
            <Text style={KYCStyle.regularHeading4}>You are few steps away{'\n'}from trading...</Text>
          </View>
        </View>
        <Pressable style={KYCStyle.button} onPress={() => navigation.navigate('KYCWizardScreen')}>
          <Text
            style={KYCStyle.MyButton}>
            Complete KYC
          </Text>
        </Pressable>
      </View>
    </View>
  )
}


const KYCStyle=StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        flex: 1,
        justifyContent: 'space-between',
        // paddingTop: 150
      },
      innerContainer: {
        padding: 40,
        flex: 2,
        justifyContent: 'center',
      },
      MyButton:{
        textAlign: 'center',
        color: '#473200',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        fontWeight: '500',
      },
      indicatorContainer: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logo: {
        marginHorizontal: 40,
        marginVertical: 50,
        width: 200,
      },
      rupee: {},
      boldHeading: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 50,
        color: colors.yellowDark,
        fontWeight: '900',
        // letterSpacing: 1,
      },
      regularHeading: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 32,
        color: 'white',
      },
      regularHeading2: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 32,
        color: 'white',
      },
      regularHeading4: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'white',
      },
      button: {
        width: 250,
        backgroundColor: `${colors.yellowLg}`,
        paddingVertical: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20,
        borderRadius: 10,
        marginTop: 150,
        position: 'relative',
        top: 30
      },
    
})