import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DeclerationScreen } from './Page/Decleration/declerationScreen';
import { EmailAuthentication } from './Page/EmailAuthenticate/EmailAuthentication';
import {KYCWelcome} from './Page/KYC/KYCWelcome';
import {KYCWizard} from './Page/KYC/KYCWizard';
import { CreateAccountScreen } from './Page/Login/createAccountScreen';
import LoginScreen from './Page/LoginPage/LoginScreen';
import {  SplashScreen } from './Page/SplashScreen';
import VerifyEmail from './Page/verifyEmail/VarifyEmail';
import { WelcomeSplash } from './Page/Welcome/WelcomeScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
            {/* <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeSplash}
              options={{ headerShown: false }}
             /> */}
           {/* <Stack.Screen
              name='SplashScreen'
              component={SplashScreen}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name='CreateAccountScreen'
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            /> 
             <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='DeclerationScreen'
              component={DeclerationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='VerifyEmailScreen'
              component={VerifyEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EmailAuthenticationScreen'
              component={EmailAuthentication}
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
              name='KYCScreen'
              component={KYCWelcome}
              options={{ headerShown: false }}
            />  */}
            <Stack.Screen
              name='KYCWizardScreen'
              component={KYCWizard}
              options={{ headerShown: false }}
            /> 
          </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
