import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import StoriesList from './stories-list/saga';
import WebsocketSaga from './websocket/saga';
import LayoutSaga from './layout/saga';
import PlansListSaga from './plans-list/saga';

export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        StoriesList(),
        WebsocketSaga(),
        LayoutSaga(),
        PlansListSaga(),
    ]);
}
