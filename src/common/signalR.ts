import signalR, { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { CONFIG_URL } from '../config/configuration';

const createSignalRConnection = () => {
    const hubConnection = new HubConnectionBuilder()
        .withUrl(CONFIG_URL.BASE_URL + 'signalRHub', {
            transport: HttpTransportType.WebSockets,
            skipNegotiation: true
        })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect()
        .build();
    return hubConnection;
};

const startConnection = async (connection: any) => {
    try {
        await connection.start();
        console.log('Connected to SignalR Hub');
    } catch (error) {
        console.error('Error connecting to SignalR Hub: ', error);
    }
};

export { createSignalRConnection, startConnection };
