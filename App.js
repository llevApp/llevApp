import SplashScreen from './src/pages/Home/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
<SafeAreaProvider>
  <SplashScreen></SplashScreen>
</SafeAreaProvider>

  );
}

