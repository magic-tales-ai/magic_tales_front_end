import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_CONNECTED,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_DISCONNECT,
    SEND_MESSAGE
} from './constants';

// Acciones para la conexión WebSocket
export const websocketConnect = (params, callback) => ({
    type: WEBSOCKET_CONNECT,
    payload: { params, callback }
});
export const websocketConnected = (socket) => ({
    type: WEBSOCKET_CONNECTED,
    payload: { socket }
});
export const websocketMessage = (message) => ({
    type: WEBSOCKET_MESSAGE,
    payload: { message }
});
export const websocketDisconnect = (uid) => ({
    type: WEBSOCKET_DISCONNECT,
    payload: { uid }
});

// Acciones específicas para enviar mensajes al WebSocket
export const sendMessage = ({ uid, message }) => ({
    type: SEND_MESSAGE,
    payload: { uid, message }
});