import { ScrollView, StyleSheet, Text, View,Button,Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../src/constants';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';


export const Home=(props)=>{
    return(
        <View style={HomeStyle.container}>
            {/* <StatusBar barStyle={'light-content'} backgroundColor={'#212121'}> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={HomeStyle.outerDiv}>
                        <View style={HomeStyle.ProfileNameWord}>
                            <Text style={{...HomeStyle.NameText,marginBottom:1}}>M</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={HomeStyle.welcomeword}>Hello,</Text>
                            <TouchableOpacity 
                                activeOpacity={0.6} 
                                onPress={() => setprofileBox(true)} 
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                
                                <Text style={{...HomeStyle.welcomeword,marginLeft:'8px !important'}}>Mukesh</Text>
                                {/* <AntDesign name='caretdown' size={15} color={'#FFB916'} style={{ marginLeft: 8 }} /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView> 
            {/* </StatusBar> */}
        </View>
    )
}

const HomeStyle= StyleSheet.create({
    container:{
        backgroundColor: '#212121', flex: 1, padding: 8
    },
    outerDiv:{
        flexDirection: 'row', alignItems: 'center' 
    },
    ProfileNameWord:{
     backgroundColor: colors.grayMed, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center',marginBottom:2
    },
    NameText:{ 
       fontSize: 16, color: '#FFFFFF', 
    },
    welcomeword:{
        fontSize: 16,  color: '#FFF6E0', marginLeft: 10 
    }

    
})