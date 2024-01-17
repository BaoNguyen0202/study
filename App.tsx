import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux-store/store';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Detail';
import AudioScreen from './src/components/Audio';
import LoginScreen from './src/screens/login/login';
const Stack = createStackNavigator();
const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="home" component={HomeScreen} />
                        <Stack.Screen name="details" component={DetailsScreen} />
                        <Stack.Screen name="dudio" component={AudioScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
};
export default App;
