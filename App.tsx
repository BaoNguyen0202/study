import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux-store/store';
import HomeScreen from './src/screens/home/home';
import DetailsScreen from './src/screens/detail/detail';
import AudioScreen from './src/components/audio';
import LoginScreen from './src/screens/login/login';
import AppNavigationContainer from './src/navigation';
const Stack = createStackNavigator();
const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <AppNavigationContainer></AppNavigationContainer>
            </PaperProvider>
        </Provider>
    );
};
export default App;
