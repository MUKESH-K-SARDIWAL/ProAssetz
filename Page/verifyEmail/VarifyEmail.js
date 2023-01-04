import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../src/constants';
import {  Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function VerifyEmail(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, color: 'white' }}>
          An email has been seen to{'\n'}
          <Text style={{ fontSize: 20, color: colors.yellowDark }}>
            {props?.route?.params?.formData !== undefined
              ? props.route.params.formData.email
              : 'your email'}
          </Text>{' '}
          for{'\n'}
          confirmation.Please follow the
          {'\n'}instrution there to complete your{'\n'}registration. {'\n'}
        </Text>
        <Text style={{ fontSize: 20, color: 'white', marginTop: 3 }}>
          Did not receive email{' '}
          <Text
            onPress={() => navigation.navigate('ContactUs')}
            style={{ fontSize: 20, color: colors.yellowDark }}>
            contact us
          </Text>
          {'\n'}
        </Text>
        <Text style={{ fontSize: 20, color: 'white', marginTop: 3 }}>
          Once confirmed click on Continue to login
        </Text>
      </View>
      <Button
        dark={false}
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
        mode="contained">
        <Text style={{ textAlign: 'center', color: 'rgba(71, 50, 0, 1)', fontSize: 20, fontFamily: 'Nunito-SemiBold', fontWeight: '600' }}>Continue</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: `${colors.yellowLg}`,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  container: {
    backgroundColor: colors.bgColor,
    // height: '100%',
    justifyContent: 'space-between',
    flex: 1,
    padding: 40,
    paddingBottom: 0,
  },
  scrollContainer: {
    // height: '100%',
    // flex:2,
    // backgroundColor:'red'
  },
  disabledButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#424040',
    color: '#fff',
    borderRadius: 5,
    height: 55,
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    marginVertical: 15,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
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
});
