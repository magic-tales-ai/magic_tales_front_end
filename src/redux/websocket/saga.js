import { put, takeEvery, call, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { websocketConnected, websocketMessage, websocketDisconnect } from './actions';

import {
  WEBSOCKET_CONNECT,
  SEND_MESSAGE
} from './constants';

const WEBSOCKET_URL = 'ws://localhost:8001/bot/ws';

function createWebSocketConnection(url, params = {}, callback) {
  const urlWithParams = `${url}?${new URLSearchParams(params)}`;
  const socket = new WebSocket(urlWithParams);
  let uidCreated = false;

  return eventChannel((emit) => {
    var uid = null;

    socket.onopen = () => {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (!uidCreated) {
          uid = message.uid;
          uidCreated = true;
          emit(websocketConnected({ socket, uid }));

          if(callback){
            callback({ uid });
          }

        }
        else {
          emit(websocketMessage({...message, uid}));
        }
      };
    };

    socket.onclose = () => {
      emit(websocketDisconnect(uid));
    };

    const unsubscribe = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };

    return unsubscribe;
  });
}

function* handleWebSocketConnection({ payload: { params, callback } } = {}) {
  const socketChannel = yield call(createWebSocketConnection, WEBSOCKET_URL, params, callback);

  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* handleSendMessage(action) {
  const { message, uid } = action.payload;
  const socket = yield select((state) => state.Websocket.get(uid));

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

export default function* watchWebSocket() {
  yield takeEvery(WEBSOCKET_CONNECT, handleWebSocketConnection);
  yield takeEvery(SEND_MESSAGE, handleSendMessage);
}