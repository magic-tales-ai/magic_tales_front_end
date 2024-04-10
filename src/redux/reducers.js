import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import ChatsList from './chats-list/reducers';
import StoriesList from './stories-list/reducers';
import Websocket from './websocket/reducers';
import Layout from './layout/reducer';
import PlansList from './plans-list/reducers';
import ProfilesList from './profiles-list/reducers';
import ModalConfirm from './modal-confirm-change-chat/reducers';
import ModalSignIn from './modal-signin/reducers';

export default combineReducers({
    Auth,
    ChatsList,
    StoriesList,
    Websocket,
    Layout,
    PlansList,
    ProfilesList,
    ModalConfirm,
    ModalSignIn
});