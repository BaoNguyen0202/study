import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Detail';
import LoginScreen from './src/screens/login/login';
import { Provider } from 'react-redux';
import store from './src/redux-store/store';
import AudioScreen from './src/components/Audio';
const Stack = createStackNavigator();
const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Audio" component={AudioScreen} />

                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
};
export default App;
