import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native-web';
import { colors } from '../../src/constants';
import { LoadingEffect } from '../loadingEffect/LoadingStart';

export const WelcomeSplash=()=> {
  return (
    <View style={{...SplashStyle.backGround ,position:'relative'}}>
           <Image style={SplashStyle.logoWidth}
              source={require('../../assets/logoBig.png')}
            /> 
            <LoadingEffect />
            <Text style={{position:'absolute',bottom:'2%',fontSize: 16,fontFamily: 'Nunito-SemiBold',textAlign: 'center',textTransform: 'capitalize',color: colors.darkgreytxt,}}>Version 1</Text>
    </View>
  );
}

const SplashStyle = StyleSheet.create({
    backGround:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#202020',
    },
    logoWidth:{
      width: 200,
      height: 200,
      marginTop:'50%'
    },
  })
  