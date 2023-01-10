import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../src/constants';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const TwoFactorAuth = (props) => {
  const navigation = useNavigation();
  const goToQrPage = () => {
    const { email, password } = props?.route?.params?.qrData;
    const qrPageData = {
      ...props?.route?.params?.qrData.data,
      email,
      password,      
    };
    // console.log(props?.route?.params, 'spalsh');
    // console.log(qrPageData, 'qrPageData');
    navigation.navigate('TwoFactorAuthQRScreen', { qrPageData });
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.regularHeading}>
          Setup {'\n'}
          <Text style={styles.regularHeading2} />
          <Text style={styles.boldHeading}>
            2 Factor{'\n'}
            Authentication{'\n'}
          </Text>
          <Text style={styles.regularHeading3}>{'\n'}For a secured login setup...</Text>
        </Text>
      </View>

      <Button
        disabled={false}
        dark={false}
        style={styles.button}
        onPress={goToQrPage}
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
          style={{
            fontSize: 20,
            fontFamily: 'Nunito-SemiBold',
            textAlign: 'center',
            textTransform: 'capitalize',
            color: '#473200',
          }}>
          Enable 2 factor
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    flex: 1,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    padding: 40,
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.bgColor,
  },
  indicatorContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginHorizontal: 40,
    marginVertical: 50,
    width: 200,
  },
  rupee: {},
  boldHeading: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 45,
    color: colors.yellowDark,
    fontWeight: '900',
    flexWrap: 'nowrap',
    // lineHeight:70,
    // letterSpacing: 1,
  },
  regularHeading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  regularHeading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    color: 'white',
  },
  regularHeading3: {
    fontFamily: 'Nunito-Medium',
    fontSize: 20,
    color: 'white',
  },
  button: {
    width: '70%',
    alignSelf: 'stretch',
    backgroundColor: `${colors.yellowLg}`,
    padding: 0,
    height: 46,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 10,
  },
});

export default TwoFactorAuth;