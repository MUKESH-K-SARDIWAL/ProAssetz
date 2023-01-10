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
import { Provider as PaperProvider } from 'react-native-paper';
import FillBankDetail from './Page/BankDetail/FillBankDetail';
import BankDetailsConfirm from './Page/BankDetail/bankDetailConfirm';
import { BankDocumentUpload } from './Page/BankDetail/BankDocumentUpload';
import TwoFactorAuth from './Page/Two-Factor-Authentication/firstPage';
import TwoFactorAuthQR from './Page/Two-Factor-Authentication/twoFactorQR';
import TwoFactorOTP from './Page/Two-Factor-Authentication/TwoFactorOtpVerify';
import { Home } from './Page/HomePage/Home';

export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <PaperProvider>
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
            />  */}
            {/* <Stack.Screen
              name='CreateAccountScreen'
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            /> */}
             {/* <Stack.Screen
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
            /> */}
            {/* <Stack.Screen
              name='EmailAuthenticationScreen'
              component={EmailAuthentication}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name='KYCScreen'
              component={KYCWelcome}
              options={{ headerShown: false }}
            />   
             <Stack.Screen
              name='KYCWizardScreen'
              component={KYCWizard}
              options={{ headerShown: false }}
            /> */}
          
            {/* <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name='EmailAuthenticationScreen'
              component={EmailAuthentication}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='TwoFactorAutheticationScreen'
              component={TwoFactorAuth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='TwoFactorAuthQRScreen'
              component={TwoFactorAuthQR}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='TwoFactorOTPScreen'
              component={TwoFactorOTP}
              options={{ headerShown: false }}
            /> */}
             {/* <Stack.Screen
              name='FBDScreen'
              component={FillBankDetail}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name='BankDetailsConfirmScreen'
              component={BankDetailsConfirm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='BankDocumentUploadScreen'
              component={BankDocumentUpload}
              options={{ headerShown: false }}
            />  */}
            <Stack.Screen
              name='HomeScreen'
              component={Home}
              options={{ headerShown: false }}
            />   
          </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
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
