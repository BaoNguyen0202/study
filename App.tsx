import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux-store/store';
import AppNavigationContainer from './src/navigation';
import { useEffect } from 'react';
import { createSignalRConnection, startConnection } from './src/common/signalR';
import Toast from 'react-native-toast-message';
import { Message } from './src/model/message';
import { Ultility } from './src/common/ultility';

const App = () => {

    useEffect(() => {
        const connection = createSignalRConnection();
        startConnection(connection);
        connection.on("ReceiveNotification", (message: Message) => {
            if (Ultility.getUserInfo().id == message.userAccountId) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo duyệt',
                    text2: `${message.type == 0 ? `Bài đăng "${message.name}" của bạn ${message.status}` : message.type == 1 ? `Bình luận của bạn ${message.status}` : ''}`
                });
            }
            else {
                if (message.type == 0) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo duyệt',
                        text2: `Bài đăng "${message.name}" ${message.status}`
                    });
                }
            }
        });
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <Provider store={store}>
            <PaperProvider>
                <AppNavigationContainer></AppNavigationContainer>
                <Toast />
            </PaperProvider>
        </Provider>
    );
};
export default App;
