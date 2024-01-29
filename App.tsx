import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux-store/store';
import AppNavigationContainer from './src/navigation';
import { useEffect } from 'react';
// import { createSignalRConnection, startConnection } from './src/common/signalR';

const App = () => {

    // useEffect(() => {
    //     const connection = createSignalRConnection();
    //     startConnection(connection);
    //     connection.on('ReceiveNotification', (message) => {
    //         console.log('Received Notification: ', message);
    //     });
    //     return () => {
    //         connection.stop();
    //     };
    // }, []);

    return (
        <Provider store={store}>
            <PaperProvider>
                <AppNavigationContainer></AppNavigationContainer>
            </PaperProvider>
        </Provider>
    );
};
export default App;
