import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomePage from '../components/WelcomePage';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}> 
       <WelcomePage />

      </ScrollView>

      <StatusBar backgroundColor="#161622" style='light' />
      
    </SafeAreaView>
  );
}


