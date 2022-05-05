import SplashScreen from './src/pages/Home/SplashScreen';
import TripScreen from './src/pages/Modules/Driver/TripScene';
import FooterTab from './src/ui/FooterTab';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
export default function App() {
  return (
    <NativeBaseProvider>
    <SafeAreaProvider>
    {/* <TripScreen></TripScreen>  */}
      <FooterTab></FooterTab>
    </SafeAreaProvider>
  </NativeBaseProvider>

  );
}

