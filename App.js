import SplashScreen from './src/pages/Home/SplashScreen';
import TripScreen from './src/pages/Modules/Driver/TripDriver/TripScene';
import Driver from './src/pages/Modules/Driver/Driver';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
export default function App() {
  return (
    <NativeBaseProvider>
    <SafeAreaProvider>
    {/* <TripScreen></TripScreen>  */}
    <Driver></Driver>
    </SafeAreaProvider>
  </NativeBaseProvider>

  );
}

