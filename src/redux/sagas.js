import { all } from 'redux-saga/effects';
import AuthSaga from './auth/saga';
import UserSaga from './user/saga';
import StoriesList from './stories-list/saga';
import WebsocketSaga from './websocket/saga';
import LayoutSaga from './layout/saga';
import PlansListSaga from './plans-list/saga';
import ProfilesListSaga from './profiles-list/saga';
import SystemsSaga from './systems/sagas';

export default function* rootSaga(getState) {
    yield all([
        AuthSaga(),
        UserSaga(),
        StoriesList(),
        WebsocketSaga(),
        LayoutSaga(),
        PlansListSaga(),
        ProfilesListSaga(),
        SystemsSaga(),
    ]);
}
