import { Map } from 'immutable';
import {
    WEBSOCKET_CONNECTED,
    WEBSOCKET_DISCONNECT,
} from './constants';

const websocketReducer = (state = new Map(), action) => {
    switch (action.type) {
        case WEBSOCKET_CONNECTED:
            const { socket } = action.payload;
            return state.set(socket.uid, socket.socket);

        case WEBSOCKET_DISCONNECT:
            console.log('DISCONECT => ', action);
            return state;

        default:
            return state;
    }
};

export default websocketReducer;